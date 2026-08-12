import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import './App.css'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import InnerPage from './pages/InnerPage'
import ProjectsPage from './pages/ProjectsPage'

function SiteRoutes() {
  const location = useLocation()
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
    <Header />
    <AnimatePresence mode="wait"><motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .25 }}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<ProjectsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/capabilities/:capability" element={<InnerPage />} />
        <Route path="/experience/:project" element={<InnerPage />} />
        <Route path="/*" element={<InnerPage />} />
      </Routes>
    </motion.div></AnimatePresence>
    <Footer />
  </>
}

export default function App() { return <BrowserRouter><SiteRoutes /></BrowserRouter> }
