import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import './App.css'
import Header from './components/layout/Header'
import LogoIntro from './components/layout/LogoIntro'
import Footer from './components/layout/Footer'
import Seo from './components/Seo'
import { resolveSeo } from './data/seo'

const Home = lazy(() => import('./pages/Home'))
const InnerPage = lazy(() => import('./pages/InnerPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))

function SiteRoutes() {
  const location = useLocation()
  const seo = resolveSeo(location.pathname)
  useEffect(() => {
    let cancelled = false
    const scroll = () => {
      if (cancelled) return
      const target = location.hash ? document.querySelector(location.hash) : null
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      else window.scrollTo({ top: 0, behavior: 'instant' })
    }
    document.fonts.ready.then(() => window.setTimeout(scroll, 80))
    return () => { cancelled = true }
  }, [location.pathname, location.hash])
  return <>
    <Seo title={seo.title} description={seo.description} canonical={seo.canonical} />
    <a href="#main-content" className="skip-link">Skip to main content</a>
    <Header />
    {location.pathname === '/' && <LogoIntro />}
    <AnimatePresence mode="wait"><motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .25 }}>
      <Suspense fallback={<div className="route-loading" aria-hidden="true" />}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<ProjectsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/capabilities/:capability" element={<InnerPage />} />
          <Route path="/experience/:project" element={<InnerPage />} />
          <Route path="/*" element={<InnerPage />} />
        </Routes>
      </Suspense>
    </motion.div></AnimatePresence>
    <Footer />
  </>
}

export default function App() { return <BrowserRouter><SiteRoutes /></BrowserRouter> }
