import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { capabilities } from '../../data/site'

const links = [
  ['Company', '/company'],
  ['Capabilities', '/capabilities'],
  ['Industries', '/industries'],
  ['Projects', '/experience'],
  ['Products', '/products'],
  ['Insights', '/insights'],
]

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Hybrid Control Corporation home">
      <img className="logo-mark" src="/logo-transparent.png" alt="" width="64" height="43" />
      <span>HYBRID CONTROL<small>CORPORATION</small></span>
    </Link>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [mega, setMega] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const mobileRef = useRef<HTMLDivElement>(null)
  const prevFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  useEffect(() => {
    if (!open) return
    prevFocusRef.current = document.activeElement as HTMLElement | null
    const frame = requestAnimationFrame(() => {
      const first = mobileRef.current?.querySelector<HTMLElement>('button, a[href]')
      first?.focus()
    })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); return }
      if (e.key !== 'Tab' || !mobileRef.current) return
      const focusable = Array.from(mobileRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]')).filter(el => !el.hasAttribute('hidden'))
      if (focusable.length === 0) return
      const firstEl = focusable[0]
      const lastEl = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus() }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('keydown', onKey)
      prevFocusRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMega(false) }
    if (mega) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mega])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'menu-open' : ''}`}>
      <div className="nav-shell">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => label === 'Capabilities' ? (
            <div className="nav-drop" key={label} onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)} onFocusCapture={() => setMega(true)} onBlurCapture={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setMega(false) }}>
              <NavLink to={href} aria-expanded={mega} aria-haspopup="true" onFocus={() => setMega(true)}>{label}<ChevronDown size={13} aria-hidden="true" /></NavLink>
              <AnimatePresence>{mega && (
                <motion.div className="mega-menu" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} role="menu" onMouseLeave={() => setMega(false)}>
                  <div><span className="eyebrow">Capabilities</span><h3>Engineering the complete system.</h3></div>
                  <div className="mega-links" role="none">
                    {capabilities.map((item) => <Link key={item.slug} to={`/capabilities/${item.slug}`} role="menuitem" onClick={() => setMega(false)}>{item.title}<ArrowUpRight size={14} aria-hidden="true" /></Link>)}
                  </div>
                  <Link className="mega-feature" to="/capabilities/system-integration#digital-intelligence" onClick={() => setMega(false)}><span>Featured focus</span><strong>From industrial control to data intelligence</strong><ArrowUpRight aria-hidden="true" /></Link>
                </motion.div>
              )}</AnimatePresence>
            </div>
          ) : <NavLink key={label} to={href}>{label}</NavLink>)}
        </nav>
        <Link to="/contact" className="nav-cta">Contact us <ArrowUpRight size={16} aria-hidden="true" /></Link>
        <button className="menu-toggle" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} aria-controls="mobile-nav"><Menu aria-hidden="true" /></button>
      </div>

      <AnimatePresence>{open && (
        <motion.div ref={mobileRef} className="mobile-menu" id="mobile-nav" role="dialog" aria-modal="true" aria-label="Mobile navigation" initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} transition={{ duration: .35 }}>
          <div className="mobile-top"><Logo /><button onClick={() => setOpen(false)} aria-label="Close menu"><X aria-hidden="true" /></button></div>
          <nav aria-label="Mobile primary">{links.map(([label, href], index) => <motion.div key={label} initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .08 + index * .04 }}><Link to={href} onClick={() => setOpen(false)}><span aria-hidden="true">0{index + 1}</span>{label}<ArrowUpRight aria-hidden="true" /></Link></motion.div>)}</nav>
          <div className="mobile-contact"><span>Start a conversation</span><a href="tel:+27357891699">+27 35 789 1699</a><a href="mailto:info@hybridcontrol.co.za">info@hybridcontrol.co.za</a></div>
        </motion.div>
      )}</AnimatePresence>
    </header>
  )
}
