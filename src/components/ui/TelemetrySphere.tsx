import { useEffect, useRef } from 'react'

type SpherePoint = {
  x: number
  y: number
  z: number
}

type SphereKeyword = {
  label: string
  lane: number
  reverse?: boolean
}

const POINT_COUNT = 720
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))
const KEYWORD_INTERVAL = 1280
const KEYWORD_DURATION = 3300

const keywords: SphereKeyword[] = [
  { label: 'AUTOMATION', lane: -0.42 },
  { label: 'TELEMETRY', lane: 0.2, reverse: true },
  { label: 'SYSTEM INTEGRATION', lane: -0.08 },
  { label: 'SCADA', lane: 0.44, reverse: true },
  { label: 'ELECTRICAL ENGINEERING', lane: -0.28, reverse: true },
  { label: 'INDUSTRIAL DATA', lane: 0.04 },
  { label: 'REMOTE MONITORING', lane: 0.32 },
  { label: 'PROJECT MANAGEMENT', lane: -0.5, reverse: true },
]

const points: SpherePoint[] = Array.from({ length: POINT_COUNT }, (_, index) => {
  const y = 1 - (index / (POINT_COUNT - 1)) * 2
  const radius = Math.sqrt(1 - y * y)
  const angle = GOLDEN_ANGLE * index

  return {
    x: Math.cos(angle) * radius,
    y,
    z: Math.sin(angle) * radius,
  }
})

const drawKeywords = (
  context: CanvasRenderingContext2D,
  time: number,
  centerX: number,
  centerY: number,
  sphereRadius: number,
  foreground: boolean,
) => {
  const cycle = keywords.length * KEYWORD_INTERVAL

  keywords.forEach((keyword, index) => {
    let elapsed = (time - index * KEYWORD_INTERVAL) % cycle
    if (elapsed < 0) elapsed += cycle
    if (elapsed > KEYWORD_DURATION) return

    const progress = elapsed / KEYWORD_DURATION
    const isForeground = progress >= 0.5
    if (isForeground !== foreground) return

    const direction = keyword.reverse ? -1 : 1
    const travel = (progress - 0.5) * sphereRadius * 3.15
    const x = centerX + travel * direction
    const y = centerY + keyword.lane * sphereRadius + Math.sin(progress * Math.PI) * sphereRadius * 0.08
    const fade = Math.sin(progress * Math.PI)
    const flash = Math.exp(-Math.pow((progress - 0.5) / 0.075, 2))
    const fontSize = Math.max(10, Math.min(15, sphereRadius * 0.045)) * (0.88 + flash * 0.18)

    context.save()
    context.font = `600 ${fontSize}px Manrope, sans-serif`
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillStyle = `rgba(4, 54, 122, ${0.2 + fade * 0.72})`
    context.shadowColor = `rgba(22, 185, 255, ${flash * 0.82})`
    context.shadowBlur = 2 + flash * 16
    context.fillText(keyword.label, x, y)

    if (flash > 0.12) {
      const textWidth = context.measureText(keyword.label).width
      context.strokeStyle = `rgba(22, 185, 255, ${flash * 0.68})`
      context.lineWidth = 0.8
      context.beginPath()
      context.moveTo(x - textWidth / 2 - 12, y)
      context.lineTo(x - textWidth / 2 - 4, y)
      context.moveTo(x + textWidth / 2 + 4, y)
      context.lineTo(x + textWidth / 2 + 12, y)
      context.stroke()
    }

    context.restore()
  })
}

export default function TelemetrySphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let width = 0
    let height = 0
    let rotation = 0.35
    let lastTime = 0
    let pointerX = 0
    let pointerY = 0
    let targetPointerX = 0
    let targetPointerY = 0

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    const render = (time = 0) => {
      if (!width || !height) return

      const elapsed = lastTime ? Math.min(time - lastTime, 32) : 0
      lastTime = time
      if (!reducedMotion.matches) rotation += elapsed * 0.00012

      pointerX += (targetPointerX - pointerX) * 0.045
      pointerY += (targetPointerY - pointerY) * 0.045

      context.clearRect(0, 0, width, height)

      const centerX = width / 2
      const centerY = height / 2
      const sphereRadius = Math.min(width, height) * (width < 520 ? 0.34 : 0.36)
      const tilt = -0.18 + pointerY * 0.18
      const spin = rotation + pointerX * 0.28
      const sinSpin = Math.sin(spin)
      const cosSpin = Math.cos(spin)
      const sinTilt = Math.sin(tilt)
      const cosTilt = Math.cos(tilt)
      const keywordTime = reducedMotion.matches ? KEYWORD_DURATION / 2 : time

      drawKeywords(context, keywordTime, centerX, centerY, sphereRadius, false)

      for (const point of points) {
        const rotatedX = point.x * cosSpin - point.z * sinSpin
        const rotatedZ = point.x * sinSpin + point.z * cosSpin
        const rotatedY = point.y * cosTilt - rotatedZ * sinTilt
        const depth = point.y * sinTilt + rotatedZ * cosTilt
        const perspective = 1 + depth * 0.14
        const x = centerX + rotatedX * sphereRadius * perspective
        const y = centerY + rotatedY * sphereRadius * perspective
        const normalizedDepth = (depth + 1) / 2
        const dotRadius = 0.65 + normalizedDepth * 1.65
        const opacity = 0.13 + normalizedDepth * 0.8

        context.beginPath()
        context.arc(x, y, dotRadius, 0, Math.PI * 2)
        const red = 3 + normalizedDepth * 19
        const green = 20 + normalizedDepth * 165
        const blue = 55 + normalizedDepth * 200
        context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`
        context.shadowColor = normalizedDepth > 0.76 ? 'rgba(22, 185, 255, .62)' : 'transparent'
        context.shadowBlur = normalizedDepth > 0.76 ? 6 : 0
        context.fill()
      }

      context.shadowBlur = 0
      drawKeywords(context, keywordTime, centerX, centerY, sphereRadius, true)
      if (!reducedMotion.matches) frame = window.requestAnimationFrame(render)
    }

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect()
      targetPointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
      targetPointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
    }

    const resetPointer = () => {
      targetPointerX = 0
      targetPointerY = 0
    }

    const handleMotionChange = () => {
      window.cancelAnimationFrame(frame)
      lastTime = 0
      render()
    }

    const observer = new ResizeObserver(() => {
      resize()
      if (reducedMotion.matches) render()
    })

    observer.observe(canvas)
    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerleave', resetPointer)
    reducedMotion.addEventListener('change', handleMotionChange)
    resize()
    render()

    return () => {
      observer.disconnect()
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerleave', resetPointer)
      reducedMotion.removeEventListener('change', handleMotionChange)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="telemetry-sphere" aria-hidden="true">
      <canvas ref={canvasRef} className="telemetry-sphere-canvas" />
    </div>
  )
}
