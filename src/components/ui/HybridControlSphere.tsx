"use client";

import { useEffect, useRef } from "react";

type Point3D = {
  x: number;
  y: number;
  z: number;
  phase: number;
};

interface ControlNode {
  pointIndex: number;
  activatedAtCycleTime: number;
}

interface HybridControlSphereProps {
  className?: string;
  pointCount?: number;
  rotationSpeed?: number;
  opacity?: number;
  theme?: "auto" | "light" | "dark";
}

const CYCLE_DURATION = 12000; // 12-second deliberate cycle: idle -> scan -> activate -> connect -> fade -> idle
const SCAN_START = 2600;
const SCAN_DURATION = 3200;
const SCAN_END = SCAN_START + SCAN_DURATION;
const CONN_START = 5800;
const CONN_FADE_IN_END = 6800;
const CONN_FADE_OUT_START = 8600;
const CONN_END = 9800;
const FADE_START = 8800;
const FADE_END = 11000;

export function HybridControlSphere({
  className = "",
  pointCount = 900,
  rotationSpeed = 0.00018,
  opacity = 1,
  theme = "auto",
}: HybridControlSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrame = 0;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = motionQuery.matches;

    // Detect light or dark mode from surrounding container
    const isLightMode = () => {
      if (theme === "light") return true;
      if (theme === "dark") return false;
      const style = window.getComputedStyle(canvas);
      const match = style.color.match(/\d+/g);
      if (match) {
        const [r, g, b] = match.map(Number);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness < 128;
      }
      return false;
    };

    let isLight = isLightMode();

    // Generate points uniformly on sphere using Fibonacci spiral (golden angle)
    const points: Point3D[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < pointCount; i++) {
      const y = 1 - (i / (pointCount - 1)) * 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;

      points.push({
        x: Math.cos(theta) * radius,
        y,
        z: Math.sin(theta) * radius,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // 4 control nodes spread across distinct latitude bands
    const pickNodes = (): ControlNode[] => {
      const candidates = [
        Math.floor(pointCount * 0.2),
        Math.floor(pointCount * 0.4),
        Math.floor(pointCount * 0.62),
        Math.floor(pointCount * 0.8),
      ];

      return candidates.map((idx) => {
        const jitter = Math.floor((Math.random() - 0.5) * 30);
        const pointIndex = Math.max(0, Math.min(pointCount - 1, idx + jitter));
        return {
          pointIndex,
          activatedAtCycleTime: -1,
        };
      });
    };

    let controlNodes: ControlNode[] = pickNodes();
    let lastCycleIndex = -1;

    // 2-3 connection pairs between the control nodes
    const connectionPairs: [number, number][] = [
      [0, 1],
      [1, 2],
      [2, 3],
    ];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      if (width === 0 || height === 0) return;

      isLight = isLightMode();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (reduceMotion) return;
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      targetMouseRef.current.x = (x - 0.5) * 2;
      targetMouseRef.current.y = (y - 0.5) * 2;
    };

    const handlePointerLeave = () => {
      targetMouseRef.current.x = 0;
      targetMouseRef.current.y = 0;
    };

    const projectPoint = (
      point: Point3D,
      cosR: number,
      sinR: number,
      cosT: number,
      sinT: number,
      radius: number,
      centerX: number,
      centerY: number,
      parallaxX: number,
      parallaxY: number
    ) => {
      // Rotation around Y axis
      const rx = point.x * cosR - point.z * sinR;
      const rz = point.x * sinR + point.z * cosR;

      // Restrained tilt around X axis
      const ry = point.y * cosT - rz * sinT;
      const rzFinal = point.y * sinT + rz * cosT;

      const perspective = 1 + rzFinal * 0.08;

      return {
        x: centerX + rx * radius * perspective + parallaxX,
        y: centerY + ry * radius * perspective + parallaxY,
        z: rzFinal,
        normY: ry,
      };
    };

    const render = (time: number) => {
      if (width === 0 || height === 0) {
        if (!reduceMotion) animationFrame = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Standalone particle sphere centered in container with transparent background
      const minDimension = Math.min(width, height);
      const radius = minDimension * 0.4;
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // Mouse parallax: very subtle, restrained dampening
      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * 0.03;
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * 0.03;

      const parallaxX = reduceMotion ? 0 : mouseRef.current.x * 6;
      const parallaxY = reduceMotion ? 0 : mouseRef.current.y * 4;

      const rotation = reduceMotion ? 0.38 : time * rotationSpeed;
      const tilt = 0.24; // Subtle industrial axial tilt

      const cosR = Math.cos(rotation);
      const sinR = Math.sin(rotation);
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);

      // Animation cycle management:
      // idle -> scan -> nodes activate -> connections appear -> fade -> idle
      const cycleIndex = Math.floor(time / CYCLE_DURATION);
      const cycleTime = reduceMotion ? 6500 : time % CYCLE_DURATION;

      // On new cycle, refresh control nodes
      if (cycleIndex !== lastCycleIndex && !reduceMotion) {
        lastCycleIndex = cycleIndex;
        controlNodes = pickNodes();
      }

      // Scan calculation
      let scanActive = false;
      let scanNormY = -2;
      let scanAlpha = 0;

      if (!reduceMotion && cycleTime >= SCAN_START && cycleTime < SCAN_END) {
        scanActive = true;
        const scanProgress = (cycleTime - SCAN_START) / SCAN_DURATION;
        scanNormY = -1.05 + scanProgress * 2.1;
        scanAlpha = Math.sin(scanProgress * Math.PI) * 0.22;
      }

      // Connections opacity
      let connAlpha = 0;
      if (reduceMotion) {
        connAlpha = 0.22;
      } else if (cycleTime >= CONN_START && cycleTime < CONN_END) {
        if (cycleTime < CONN_FADE_IN_END) {
          connAlpha = (cycleTime - CONN_START) / (CONN_FADE_IN_END - CONN_START);
        } else if (cycleTime <= CONN_FADE_OUT_START) {
          connAlpha = 1;
        } else {
          connAlpha =
            1 -
            (cycleTime - CONN_FADE_OUT_START) /
              (CONN_END - CONN_FADE_OUT_START);
        }
      }

      // 1. Atmospheric halo
      const halo = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.15,
        centerX,
        centerY,
        radius * 1.25
      );
      if (isLight) {
        halo.addColorStop(0, "rgba(8, 124, 240, 0.08)");
        halo.addColorStop(0.5, "rgba(8, 124, 240, 0.025)");
        halo.addColorStop(1, "rgba(240, 244, 248, 0)");
      } else {
        halo.addColorStop(0, "rgba(8, 124, 240, 0.08)");
        halo.addColorStop(0.5, "rgba(6, 26, 48, 0.035)");
        halo.addColorStop(1, "rgba(2, 8, 23, 0)");
      }

      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // 2. Technical radar / engineering reference rings
      ctx.save();
      ctx.strokeStyle = isLight
        ? "rgba(2, 8, 23, 0.13)"
        : "rgba(110, 216, 255, 0.05)";
      ctx.lineWidth = 1;

      [1.04, 1.15].forEach((scale) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * scale, 0, Math.PI * 2);
        ctx.stroke();
      });

      ctx.setLineDash([2, 8]);
      ctx.strokeStyle = isLight
        ? "rgba(2, 8, 23, 0.09)"
        : "rgba(110, 216, 255, 0.05)";
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.22, 0, Math.PI * 2);
      ctx.stroke();

      // Subtle horizontal datum / axis line
      ctx.setLineDash([1, 9]);
      ctx.strokeStyle = isLight
        ? "rgba(2, 8, 23, 0.08)"
        : "rgba(110, 216, 255, 0.04)";
      ctx.beginPath();
      ctx.moveTo(centerX - radius * 1.1, centerY);
      ctx.lineTo(centerX + radius * 1.1, centerY);
      ctx.stroke();
      ctx.restore();

      // 3. Project all 3D points
      const projected = points.map((p) =>
        projectPoint(
          p,
          cosR,
          sinR,
          cosT,
          sinT,
          radius,
          centerX,
          centerY,
          parallaxX,
          parallaxY
        )
      );

      // Track node activation
      const nodeStates = controlNodes.map((node) => {
        const proj = projected[node.pointIndex];

        let intensity = 0.18; // Base resting visibility

        if (reduceMotion) {
          intensity = 0.55;
        } else if (scanActive && proj.normY <= scanNormY) {
          if (node.activatedAtCycleTime < 0) {
            node.activatedAtCycleTime = cycleTime;
          }
          const elapsed = cycleTime - node.activatedAtCycleTime;
          intensity = Math.min(1, 0.18 + (elapsed / 600) * 0.82);
        } else if (node.activatedAtCycleTime >= 0 && cycleTime < FADE_START) {
          intensity = 1.0;
        } else if (cycleTime >= FADE_START && cycleTime < FADE_END) {
          const fadeProgress = (cycleTime - FADE_START) / (FADE_END - FADE_START);
          intensity = Math.max(0.18, 1.0 - fadeProgress * 0.82);
        }

        return {
          proj,
          intensity,
        };
      });

      // 4. Subtle scan line plane
      if (scanActive && scanAlpha > 0.01) {
        const scanY = centerY + scanNormY * radius;
        const sliceWidth =
          Math.sqrt(Math.max(0, 1 - Math.min(1, scanNormY * scanNormY))) *
          radius *
          1.06;

        if (sliceWidth > 2) {
          const scanGrad = ctx.createLinearGradient(
            centerX - sliceWidth,
            scanY,
            centerX + sliceWidth,
            scanY
          );
          if (isLight) {
            scanGrad.addColorStop(0, "rgba(8, 124, 240, 0)");
            scanGrad.addColorStop(0.2, `rgba(8, 124, 240, ${scanAlpha * 0.45})`);
            scanGrad.addColorStop(0.5, `rgba(8, 124, 240, ${scanAlpha * 1.1})`);
            scanGrad.addColorStop(0.8, `rgba(8, 124, 240, ${scanAlpha * 0.45})`);
            scanGrad.addColorStop(1, "rgba(8, 124, 240, 0)");
          } else {
            scanGrad.addColorStop(0, "rgba(110, 216, 255, 0)");
            scanGrad.addColorStop(0.2, `rgba(110, 216, 255, ${scanAlpha * 0.35})`);
            scanGrad.addColorStop(0.5, `rgba(110, 216, 255, ${scanAlpha * 0.9})`);
            scanGrad.addColorStop(0.8, `rgba(110, 216, 255, ${scanAlpha * 0.35})`);
            scanGrad.addColorStop(1, "rgba(110, 216, 255, 0)");
          }

          ctx.strokeStyle = scanGrad;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(centerX - sliceWidth, scanY);
          ctx.lineTo(centerX + sliceWidth, scanY);
          ctx.stroke();
        }
      }

      // 5. Subtle curved connections between active control nodes
      if (connAlpha > 0.01) {
        connectionPairs.forEach(([idxA, idxB]) => {
          const nodeA = nodeStates[idxA];
          const nodeB = nodeStates[idxB];
          if (!nodeA || !nodeB) return;

          const a = nodeA.proj;
          const b = nodeB.proj;

          // Only show connection if both nodes are facing the front hemisphere
          if (a.z < -0.15 || b.z < -0.15) return;

          const depthFactor = Math.min((a.z + 0.25) / 1.25, (b.z + 0.25) / 1.25);
          const activeFactor = (nodeA.intensity + nodeB.intensity) * 0.5;
          const strokeAlpha = connAlpha * depthFactor * activeFactor * 0.38;

          if (strokeAlpha < 0.01) return;

          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2;

          // Arc outward subtly along sphere radial direction
          const dx = midX - centerX;
          const dy = midY - centerY;
          const distCenter = Math.hypot(dx, dy) || 1;
          const chordDist = Math.hypot(b.x - a.x, b.y - a.y);
          const bow = Math.min(22, chordDist * 0.16);

          const ctrlX = midX + (dx / distCenter) * bow;
          const ctrlY = midY + (dy / distCenter) * bow;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.quadraticCurveTo(ctrlX, ctrlY, b.x, b.y);

          ctx.strokeStyle = isLight
            ? `rgba(8, 124, 240, ${strokeAlpha * 1.5})`
            : `rgba(110, 216, 255, ${strokeAlpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        });
      }

      // 6. Draw particles with depth-based opacity/size
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const depth = (p.z + 1) / 2; // 0 (back) to 1 (front)
        const point = points[i];

        // Wavefront scan proximity boost
        let scanBoost = 0;
        if (scanActive) {
          const dist = Math.abs(p.normY - scanNormY);
          if (dist < 0.08) {
            scanBoost = (1 - dist / 0.08) * (scanAlpha / 0.22);
          }
        }

        const pulse = reduceMotion
          ? 1
          : 0.94 + Math.sin(time * 0.0015 + point.phase) * 0.06;

        const baseAlpha = 0.1 + depth * 0.65;
        const alpha = Math.min(
          0.92,
          (baseAlpha + scanBoost * 0.38) * pulse * opacity
        );

        const size = 0.6 + depth * 1.55 + scanBoost * 0.65;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);

        if (isLight) {
          if (scanBoost > 0.25) {
            ctx.fillStyle = `rgba(8, 124, 240, ${alpha})`;
          } else if (depth > 0.65) {
            ctx.fillStyle = `rgba(2, 8, 23, ${alpha})`;
          } else if (depth > 0.3) {
            ctx.fillStyle = `rgba(15, 60, 130, ${alpha * 0.85})`;
          } else {
            ctx.fillStyle = `rgba(90, 115, 145, ${alpha * 0.7})`;
          }
        } else {
          if (scanBoost > 0.25) {
            ctx.fillStyle = `rgba(180, 235, 255, ${alpha})`;
          } else if (depth > 0.7) {
            ctx.fillStyle = `rgba(110, 216, 255, ${alpha})`;
          } else if (depth > 0.35) {
            ctx.fillStyle = `rgba(22, 140, 220, ${alpha})`;
          } else {
            ctx.fillStyle = `rgba(16, 65, 115, ${alpha})`;
          }
        }

        ctx.fill();
      }

      // 7. Brighter control nodes (3–5 nodes)
      nodeStates.forEach(({ proj: p, intensity }) => {
        if (p.z < -0.2) return;

        const depth = (p.z + 1) / 2;
        const nodeAlpha = Math.min(1, (0.35 + intensity * 0.65) * (0.45 + depth * 0.55));
        const pulse = reduceMotion
          ? 1
          : 0.92 + Math.sin(time * 0.003 + p.x) * 0.08;

        if (isLight) {
          // Concentric technical ring
          const ringRadius = (4.6 + intensity * 1.6) * pulse;
          ctx.beginPath();
          ctx.arc(p.x, p.y, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(8, 124, 240, ${nodeAlpha * 0.65})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Dark navy core node
          const coreRadius = (1.9 + intensity * 0.8) * pulse;
          ctx.beginPath();
          ctx.arc(p.x, p.y, coreRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(2, 8, 23, ${nodeAlpha * 0.95})`;
          ctx.fill();

          // Subtle localized beacon halo when active
          if (intensity > 0.45) {
            const haloRadius = (9 + intensity * 4.5) * pulse;
            ctx.beginPath();
            ctx.arc(p.x, p.y, haloRadius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(8, 124, 240, ${(intensity - 0.45) * 0.12 * depth})`;
            ctx.fill();
          }
        } else {
          // Concentric technical ring
          const ringRadius = (4.6 + intensity * 1.6) * pulse;
          ctx.beginPath();
          ctx.arc(p.x, p.y, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(110, 216, 255, ${nodeAlpha * 0.45})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Understated core node
          const coreRadius = (1.9 + intensity * 0.8) * pulse;
          ctx.beginPath();
          ctx.arc(p.x, p.y, coreRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(215, 245, 255, ${nodeAlpha * 0.95})`;
          ctx.fill();

          // Subtle localized beacon halo when active
          if (intensity > 0.45) {
            const haloRadius = (9 + intensity * 4.5) * pulse;
            ctx.beginPath();
            ctx.arc(p.x, p.y, haloRadius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(8, 124, 240, ${(intensity - 0.45) * 0.07 * depth})`;
            ctx.fill();
          }
        }
      });

      if (!reduceMotion) {
        animationFrame = requestAnimationFrame(render);
      }
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      reduceMotion = e.matches;
      cancelAnimationFrame(animationFrame);
      if (reduceMotion) {
        render(6500);
      } else {
        animationFrame = requestAnimationFrame(render);
      }
    };

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) render(6500);
    });

    resizeObserver.observe(canvas);
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    motionQuery.addEventListener("change", handleMotionChange);

    if (reduceMotion) {
      render(6500);
    } else {
      animationFrame = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, [pointCount, rotationSpeed, opacity, theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`hybrid-control-sphere-canvas ${className}`}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "auto",
        zIndex: 0,
      }}
    />
  );
}

export default HybridControlSphere;
