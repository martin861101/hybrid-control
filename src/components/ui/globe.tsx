import { useEffect, useRef, useState } from 'react'
import createGlobe, { type COBEOptions } from 'cobe'
import '../../styles/industries-landing.css'

export interface EarthHorizonProps {
  className?: string
}

export default function EarthHorizon({ className = '' }: EarthHorizonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [webGlSupported, setWebGlSupported] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    let globe: ReturnType<typeof createGlobe> | null = null
    let animId: number
    let isVisible = true
    let phi = 0

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Target dimensions for oversized horizon globe
    const size = 1200
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    try {
      const config: COBEOptions = {
        width: size * dpr,
        height: size * dpr,
        devicePixelRatio: dpr,
        phi: 0,
        theta: 0.16,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 24000,
        mapBrightness: 3.8,
        baseColor: [0.015, 0.07, 0.12],
        markerColor: [0.0, 0.65, 1.0],
        glowColor: [0.0, 0.35, 0.65],
        markers: [
          { location: [-26.2041, 28.0473], size: 0.07 }, // South Africa (Gauteng)
          { location: [-33.9249, 18.4241], size: 0.05 }, // Cape Town
          { location: [-28.7807, 32.0383], size: 0.06 }, // Richards Bay (Head Office)
          { location: [25.2048, 55.2708], size: 0.05 },  // Middle East / Dubai
          { location: [51.5072, -0.1276], size: 0.04 },  // Europe / London
          { location: [1.3521, 103.8198], size: 0.04 },  // Asia / Singapore
        ],
      }

      globe = createGlobe(canvas, config)
    } catch (err) {
      console.warn('EarthHorizon: WebGL or COBE initialization failed', err)
      setWebGlSupported(false)
      return
    }

    const animate = () => {
      if (!reduceMotion && isVisible && globe) {
        phi += 0.0008 // Extremely slow and elegant continuous rotation
        globe.update({ phi })
      }
      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    // Pause rendering when outside viewport to save resources
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? false
      },
      { threshold: 0.05 }
    )
    observer.observe(container)

    return () => {
      cancelAnimationFrame(animId)
      observer.disconnect()
      if (globe) {
        globe.destroy()
        globe = null
      }
    }
  }, [])

  return (
    <div
      className={`earth-horizon-root ${className}`}
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        height: '240px',
        overflow: 'hidden',
        marginTop: 0,
        pointerEvents: 'none',
      }}
    >
      {/* Subtle atmospheric glow behind horizon */}
      <div className="earth-horizon-glow" />

      {/* Sized viewport clipping bottom 75-85% of globe */}
      <div
        className="earth-horizon-viewport"
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '1400px',
          height: '240px',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {webGlSupported ? (
          <canvas
            ref={canvasRef}
            className="earth-horizon-canvas"
            style={{
              position: 'absolute',
              top: '5px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '1200px',
              height: '1200px',
              pointerEvents: 'none',
            }}
          />
        ) : (
          <div className="earth-horizon-fallback" />
        )}

        {/* Luminous cyan horizon arc line with vector callout pins */}
        <svg
          className="earth-horizon-arc-svg"
          viewBox="0 0 1200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '1200px',
            height: '200px',
            pointerEvents: 'none',
            zIndex: 4,
          }}
        >
          <defs>
            <linearGradient id="horizonArcGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#16b9ff" stopOpacity="0" />
              <stop offset="12%" stopColor="#16b9ff" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#7be1ff" stopOpacity="0.95" />
              <stop offset="88%" stopColor="#16b9ff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#16b9ff" stopOpacity="0" />
            </linearGradient>
            <filter id="horizonGlowFilter" x="-10%" y="-100%" width="120%" height="300%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Glowing outer horizon arc */}
          <path
            d="M 0 190 A 1150 1150 0 0 1 1200 190"
            stroke="url(#horizonArcGlow)"
            strokeWidth="3"
            strokeOpacity="0.8"
            filter="url(#horizonGlowFilter)"
          />

          {/* Crisp inner core horizon arc */}
          <path
            d="M 0 190 A 1150 1150 0 0 1 1200 190"
            stroke="url(#horizonArcGlow)"
            strokeWidth="1.2"
            strokeOpacity="0.95"
          />

          {/* Left Callout: PEOPLE */}
          <g className="horizon-callout-svg">
            <text x="140" y="86" textAnchor="middle" fill="#8ecff4" fontSize="10.5" fontFamily="Manrope, sans-serif" fontWeight="600" letterSpacing="0.22em">PEOPLE</text>
            <line x1="140" y1="96" x2="140" y2="122" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.75" />
            <circle cx="140" cy="122" r="2.5" fill="#38bdf8" filter="url(#horizonGlowFilter)" />
          </g>

          {/* Center Callout: INFRASTRUCTURE */}
          <g className="horizon-callout-svg">
            <circle cx="600" cy="21" r="2.5" fill="#38bdf8" filter="url(#horizonGlowFilter)" />
            <line x1="600" y1="23.5" x2="600" y2="68" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.75" />
            <text x="600" y="84" textAnchor="middle" fill="#8ecff4" fontSize="10.5" fontFamily="Manrope, sans-serif" fontWeight="600" letterSpacing="0.22em">INFRASTRUCTURE</text>
          </g>

          {/* Right Callout: A CLEANER TOMORROW */}
          <g className="horizon-callout-svg">
            <text x="1060" y="86" textAnchor="middle" fill="#8ecff4" fontSize="10.5" fontFamily="Manrope, sans-serif" fontWeight="600" letterSpacing="0.22em">A CLEANER TOMORROW</text>
            <line x1="1060" y1="96" x2="1060" y2="122" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.75" />
            <circle cx="1060" cy="122" r="2.5" fill="#38bdf8" filter="url(#horizonGlowFilter)" />
          </g>
        </svg>
      </div>
    </div>
  )
}
