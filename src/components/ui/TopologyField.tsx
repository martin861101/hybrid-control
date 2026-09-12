import { useEffect, useRef, useMemo, type CSSProperties } from "react";

export type TopologyVariant = "telemetry" | "industries" | "process" | "default";
export type BallPosition = "auto" | "right" | "left" | "center";

export type HybridTopologyBackgroundProps = {
  variant?: TopologyVariant;
  position?: BallPosition;
  seed?: number | string;
  hue?: number;
  saturation?: number;
  brightness?: number;
  opacity?: number;
  speed?: number;
  scaleMultiplier?: number;
  className?: string;
  style?: CSSProperties;
};

interface Node3D {
  id: number;
  x: number;
  y: number;
  z: number;
  isHub: boolean;
  baseRadius: number;
  pulseSpeed: number;
  pulseOffset: number;
  flash: number;
  neighbors: Node3D[];
}

interface Edge3D {
  a: Node3D;
  b: Node3D;
  dist: number;
}

interface Packet3D {
  from: Node3D;
  to: Node3D;
  progress: number;
  speed: number;
}

// Deterministic Mulberry32 PRNG
function createPrng(seed: number) {
  let a = seed;
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(val: number, min: number, max: number) {
  return Math.min(max, Math.max(min, val));
}

export default function HybridTopologyBackground({
  variant = "default",
  position = "auto",
  seed = 1,
  hue = 0,
  saturation = 1.0,
  brightness = 1.0,
  opacity = 0.82,
  speed = 1.0,
  scaleMultiplier = 1.0,
  className = "",
  style,
}: HybridTopologyBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const numericSeed = useMemo(() => {
    if (typeof seed === "number") return seed;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) || 1;
  }, [seed]);

  const safeHue = clamp(hue, -180, 180);
  const safeSaturation = clamp(saturation, 0, 2);
  const safeBrightness = clamp(brightness, 0.35, 1.65);
  const safeOpacity = clamp(opacity, 0, 1);

  const filter = [
    `hue-rotate(${safeHue}deg)`,
    `saturate(${safeSaturation})`,
    `brightness(${safeBrightness})`,
  ].join(" ");

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    if (!container || !canvas) return;

    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext("2d");
    } catch {
      return;
    }
    if (!ctx) return;

    const prng = createPrng(numericSeed);

    // Section-specific geometry, tilt, and alignment
    const config = {
      telemetry: {
        nodeCount: 130,
        threshold: 0.45,
        rotSpeedY: 0.0016 * speed,
        rotSpeedZ: 0.0006 * speed,
        baseTiltX: 0.22,
        align: position === "auto" ? "right" : position,
        hubRatio: 0.12,
        packetCount: 9,
      },
      industries: {
        nodeCount: 145,
        threshold: 0.43,
        rotSpeedY: -0.0014 * speed,
        rotSpeedZ: 0.0008 * speed,
        baseTiltX: -0.24,
        align: position === "auto" ? "left" : position,
        hubRatio: 0.10,
        packetCount: 10,
      },
      process: {
        nodeCount: 120,
        threshold: 0.47,
        rotSpeedY: 0.0015 * speed,
        rotSpeedZ: -0.0005 * speed,
        baseTiltX: 0.34,
        align: position === "auto" ? "right" : position,
        hubRatio: 0.14,
        packetCount: 8,
      },
      default: {
        nodeCount: 125,
        threshold: 0.45,
        rotSpeedY: 0.0015 * speed,
        rotSpeedZ: 0.0006 * speed,
        baseTiltX: 0.20,
        align: position === "auto" ? "right" : position,
        hubRatio: 0.11,
        packetCount: 9,
      },
    }[variant];

    const numNodes = config.nodeCount;
    const nodes: Node3D[] = [];

    // 1. Generate 3D Spherical Fibonacci Lattice (Ball)
    for (let i = 0; i < numNodes; i++) {
      const phi = Math.acos(-1 + (2 * i) / numNodes);
      const theta = Math.sqrt(numNodes * Math.PI) * phi + (prng() - 0.5) * 0.03;

      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(phi);

      const isHub = prng() < config.hubRatio;
      nodes.push({
        id: i,
        x,
        y,
        z,
        isHub,
        baseRadius: isHub ? 3.4 : 1.7,
        pulseSpeed: (0.018 + prng() * 0.02) * speed,
        pulseOffset: prng() * Math.PI * 2,
        flash: 0,
        neighbors: [],
      });
    }

    // 2. Interconnecting Geodesic Links on Sphere Surface
    const edges: Edge3D[] = [];
    const thresholdSq = config.threshold * config.threshold;

    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const dz = nodes[j].z - nodes[i].z;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < thresholdSq) {
          const dist = Math.sqrt(distSq);
          edges.push({ a: nodes[i], b: nodes[j], dist });
          nodes[i].neighbors.push(nodes[j]);
          nodes[j].neighbors.push(nodes[i]);
        }
      }
    }

    // 3. Data Packets traveling along geodesic links
    const packets: Packet3D[] = [];
    if (edges.length > 0) {
      for (let i = 0; i < config.packetCount; i++) {
        const edge = edges[Math.floor(prng() * edges.length)];
        packets.push({
          from: edge.a,
          to: edge.b,
          progress: prng(),
          speed: (0.005 + prng() * 0.005) * speed,
        });
      }
    }

    // Pre-allocated coordinate projection buffers
    const projX = new Float32Array(numNodes);
    const projY = new Float32Array(numNodes);
    const projZ = new Float32Array(numNodes);
    const projScale = new Float32Array(numNodes);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let sphereRadius = 260;
    let centerX = 0;
    let centerY = 0;

    let isVisible = true;
    let animationFrame = 0;
    let time = prng() * 1000;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = motionQuery.matches;

    function resize() {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = Math.max(rect.width, 320);
      height = Math.max(rect.height, 220);

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const isMobile = width < 768;
      const baseR = isMobile
        ? Math.min(width, height) * 0.44
        : Math.max(340, Math.min(width * 0.32, height * 0.65));

      sphereRadius = baseR * scaleMultiplier;

      if (config.align === "right") {
        centerX = isMobile ? width * 0.58 : width * 0.68;
        centerY = isMobile ? height * 0.46 : height * 0.50;
      } else if (config.align === "left") {
        centerX = isMobile ? width * 0.42 : width * 0.32;
        centerY = isMobile ? height * 0.54 : height * 0.50;
      } else {
        centerX = width * 0.50;
        centerY = height * 0.50;
      }

      if (glow) {
        glow.style.left = `${centerX}px`;
        glow.style.top = `${centerY}px`;
        glow.style.width = `${sphereRadius * 2.3}px`;
        glow.style.height = `${sphereRadius * 2.3}px`;
      }
    }

    function render3D(stepTime: number) {
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // 3D rotation angles
      const rotY = stepTime * config.rotSpeedY;
      const tiltX = config.baseTiltX + Math.sin(stepTime * 0.0006) * 0.04;
      const rotZ = stepTime * config.rotSpeedZ;

      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(tiltX), sinX = Math.sin(tiltX);
      const cosZ = Math.cos(rotZ), sinZ = Math.sin(rotZ);

      const cameraDist = 2.4;

      // Project 3D sphere points to 2D canvas with perspective
      for (let i = 0; i < numNodes; i++) {
        const n = nodes[i];

        // Rotate Y
        const x1 = n.x * cosY - n.z * sinY;
        const z1 = n.z * cosY + n.x * sinY;

        // Rotate X (tilt)
        const y2 = n.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + n.y * sinX;

        // Rotate Z
        const x3 = x1 * cosZ - y2 * sinZ;
        const y3 = y2 * cosZ + x1 * sinZ;
        const z3 = z2;

        // Perspective factor: z3 ranges from -1 (back of ball) to +1 (front)
        const persp = cameraDist / (cameraDist - z3 * 0.65);

        projX[i] = centerX + x3 * sphereRadius * persp;
        projY[i] = centerY - y3 * sphereRadius * persp;
        projZ[i] = z3;
        projScale[i] = persp;

        if (n.flash > 0) {
          n.flash = Math.max(0, n.flash - 0.035);
        }
      }

      // Draw 3D Geodesic Connecting Lines (Sphere Surface)
      ctx.lineWidth = 1.0;
      for (let e = 0; e < edges.length; e++) {
        const edge = edges[e];
        const iA = edge.a.id;
        const iB = edge.b.id;

        const zA = projZ[iA];
        const zB = projZ[iB];
        const zAvg = (zA + zB) * 0.5;

        // Depth cueing: front edges (depthFactor ~ 1.0) are bright; back edges (~ 0.0) fade
        const depthFactor = (zAvg + 1.0) * 0.5;
        const distFactor = Math.max(0, 1.0 - edge.dist / config.threshold);

        const lineAlpha = (0.10 + depthFactor * 0.78) * distFactor * safeOpacity;
        if (lineAlpha < 0.02) continue;

        const isHubEdge = edge.a.isHub || edge.b.isHub;
        ctx.strokeStyle = isHubEdge
          ? `rgba(110, 216, 255, ${lineAlpha.toFixed(3)})`
          : `rgba(22, 185, 255, ${lineAlpha.toFixed(3)})`;

        ctx.beginPath();
        ctx.moveTo(projX[iA], projY[iA]);
        ctx.lineTo(projX[iB], projY[iB]);
        ctx.stroke();
      }

      // Draw Data Packets
      for (let p = 0; p < packets.length; p++) {
        const pkt = packets[p];
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1.0) {
          pkt.to.flash = 1.0;
          if (pkt.to.neighbors.length > 0) {
            pkt.from = pkt.to;
            pkt.to = pkt.to.neighbors[Math.floor(prng() * pkt.to.neighbors.length)];
            pkt.progress = 0;
          } else {
            const edge = edges[Math.floor(prng() * edges.length)];
            pkt.from = edge.a;
            pkt.to = edge.b;
            pkt.progress = 0;
          }
        }

        const idA = pkt.from.id;
        const idB = pkt.to.id;
        const t = pkt.progress;

        const curX = projX[idA] + (projX[idB] - projX[idA]) * t;
        const curY = projY[idA] + (projY[idB] - projY[idA]) * t;
        const curZ = projZ[idA] + (projZ[idB] - projZ[idA]) * t;
        const depthFactor = (curZ + 1.0) * 0.5;

        const packetAlpha = Math.sin(t * Math.PI) * (0.3 + depthFactor * 0.7) * safeOpacity;
        if (packetAlpha > 0.05) {
          ctx.fillStyle = `rgba(255, 255, 255, ${packetAlpha.toFixed(2)})`;
          ctx.shadowColor = "#16b9ff";
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(curX, curY, 2.2 * projScale[idA], 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Draw 3D Nodes
      for (let i = 0; i < numNodes; i++) {
        const n = nodes[i];
        const z = projZ[i];
        const persp = projScale[i];
        const depthFactor = (z + 1.0) * 0.5;

        const pulse = (Math.sin(stepTime * n.pulseSpeed + n.pulseOffset) + 1.0) * 0.5;
        const targetRadius = (n.baseRadius + pulse * (n.isHub ? 2.0 : 1.1) + n.flash * 2.0) * persp;

        const nodeAlpha = Math.min(1.0, (0.24 + depthFactor * 0.66) * (0.6 + pulse * 0.4) * safeOpacity);
        if (nodeAlpha < 0.02) continue;

        const px = projX[i];
        const py = projY[i];

        if (n.isHub) {
          // Hub halo ring
          ctx.fillStyle = `rgba(22, 185, 255, ${(nodeAlpha * 0.32).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(px, py, targetRadius * 2.2, 0, Math.PI * 2);
          ctx.fill();

          // Hub core
          ctx.fillStyle = `rgba(255, 255, 255, ${nodeAlpha.toFixed(3)})`;
          ctx.shadowColor = "#16b9ff";
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(px, py, targetRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = `rgba(110, 216, 255, ${nodeAlpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(px, py, targetRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function animate() {
      if (isVisible && !reduceMotion) {
        time += 1;
        render3D(time);
      }
      if (!reduceMotion) {
        animationFrame = requestAnimationFrame(animate);
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      try {
        resize();
        if (reduceMotion) {
          render3D(time);
        }
      } catch (e) {
        console.error("Resize error in HybridTopologyBackground:", e);
      }
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const onMotionChange = (e: MediaQueryListEvent) => {
      reduceMotion = e.matches;
      if (reduceMotion) {
        cancelAnimationFrame(animationFrame);
        render3D(time);
      } else {
        animate();
      }
    };
    motionQuery.addEventListener("change", onMotionChange);

    resize();
    if (reduceMotion) {
      render3D(time);
    } else {
      animate();
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, [numericSeed, position, scaleMultiplier, speed, variant]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`topology-bg-container ${className}`}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        /* Soft radial/gradient mask to smoothly dissolve outer edges into dark section */
        WebkitMaskImage:
          "radial-gradient(ellipse 90% 85% at 50% 50%, black 45%, rgba(0,0,0,0.65) 75%, transparent 100%)",
        maskImage:
          "radial-gradient(ellipse 90% 85% at 50% 50%, black 45%, rgba(0,0,0,0.65) 75%, transparent 100%)",
        ...style,
      }}
    >
      {/* Soft atmospheric radial glow aligned behind the ball center */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute rounded-full blur-[120px] opacity-[0.22] transition-all duration-1000"
        style={{
          background:
            "radial-gradient(circle, rgba(22,185,255,0.45) 0%, rgba(8,124,240,0.2) 45%, transparent 70%)",
          zIndex: 0,
          transform: "translate(-50%, -50%)",
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          pointerEvents: "none",
          opacity: safeOpacity,
          filter,
        }}
      />
    </div>
  );
}

export { HybridTopologyBackground };
