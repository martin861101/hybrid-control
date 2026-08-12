import { useEffect, useLayoutEffect, useState } from 'react'
import { motion } from 'motion/react'
import animatedLogo from '../../../hybrid-control-logo-animated.svg?url'

type LogoRect = {
  left: number
  top: number
  width: number
  height: number
}

type IntroPhase = 'playing' | 'docking' | 'done'

const SVG_DURATION_MS = 2800

function getOpeningRect(): LogoRect {
  const viewportPadding = window.innerWidth < 640 ? 24 : 56
  const maxWidth = Math.min(window.innerWidth - viewportPadding * 2, 760)
  const maxHeight = window.innerHeight * .68
  const width = Math.min(maxWidth, maxHeight * 1.5)
  const height = width / 1.5

  return {
    left: (window.innerWidth - width) / 2,
    top: (window.innerHeight - height) / 2,
    width,
    height,
  }
}

export default function LogoIntro() {
  const [phase, setPhase] = useState<IntroPhase>(() => (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'done' : 'playing'
  ))
  const [openingRect, setOpeningRect] = useState<LogoRect>(getOpeningRect)
  const [logoRect, setLogoRect] = useState<LogoRect>(openingRect)
  const [loaded, setLoaded] = useState(false)

  useLayoutEffect(() => {
    if (phase === 'done') return

    document.documentElement.classList.add('logo-intro-active')
    return () => document.documentElement.classList.remove('logo-intro-active')
  }, [phase])

  useEffect(() => {
    if (phase === 'done') return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [phase])

  useEffect(() => {
    if (phase !== 'playing') return

    const updateOpeningRect = () => {
      const rect = getOpeningRect()
      setOpeningRect(rect)
      setLogoRect(rect)
    }
    window.addEventListener('resize', updateOpeningRect)
    return () => window.removeEventListener('resize', updateOpeningRect)
  }, [phase])

  useEffect(() => {
    if (!loaded || phase !== 'playing') return

    const timer = window.setTimeout(() => {
      const destination = document.querySelector<HTMLElement>('.site-header .logo-mark')
      if (!destination) {
        setPhase('done')
        return
      }

      const rect = destination.getBoundingClientRect()
      setLogoRect({ left: rect.left, top: rect.top, width: rect.width, height: rect.height })
      setPhase('docking')
    }, SVG_DURATION_MS)

    return () => window.clearTimeout(timer)
  }, [loaded, phase])

  if (phase === 'done') return null

  return (
    <div className="logo-intro" aria-hidden="true">
      <motion.div
        className="logo-intro-backdrop"
        initial={false}
        animate={{ opacity: phase === 'docking' ? 0 : 1 }}
        transition={{ duration: .68, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.img
        className="logo-intro-mark"
        src={animatedLogo}
        alt=""
        initial={false}
        animate={logoRect}
        transition={{ duration: phase === 'docking' ? .88 : .2, ease: [0.22, 0.8, 0.25, 1] }}
        onLoad={() => setLoaded(true)}
        onAnimationComplete={() => {
          if (phase === 'docking') setPhase('done')
        }}
      />
      <div
        className="logo-intro-lockup"
        style={{ top: openingRect.top + openingRect.height + 12 }}
      >
        <motion.strong
          initial={{ opacity: 0, y: 16, clipPath: 'inset(0 100% 0 0)' }}
          animate={loaded && phase === 'playing'
            ? { opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)' }
            : { opacity: 0, y: -8, clipPath: 'inset(0 0% 0 0)' }}
          transition={{ delay: phase === 'playing' ? .45 : 0, duration: phase === 'playing' ? .72 : .24, ease: [0.22, 0.8, 0.25, 1] }}
        >
          Hybrid Control Corporation
        </motion.strong>
        <motion.span
          initial={{ opacity: 0, y: 10, letterSpacing: '.42em' }}
          animate={loaded && phase === 'playing'
            ? { opacity: 1, y: 0, letterSpacing: '.25em' }
            : { opacity: 0, y: -5, letterSpacing: '.25em' }}
          transition={{ delay: phase === 'playing' ? .92 : 0, duration: phase === 'playing' ? .68 : .2, ease: [0.22, 0.8, 0.25, 1] }}
        >
          Engineering <i /> Automation <i /> Operational Intelligence
        </motion.span>
      </div>
    </div>
  )
}
