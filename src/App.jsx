import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Spaces from './pages/Spaces'
import Packages from './pages/Packages'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

const PageWrap = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
)

const App = () => {
  const location = useLocation()
  return (
    <div className="min-h-screen bg-[var(--color-ivory)] text-[var(--color-text-primary)] overflow-x-hidden">
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrap><Home /></PageWrap>} />
          <Route path="/spaces" element={<PageWrap><Spaces /></PageWrap>} />
          <Route path="/packages" element={<PageWrap><Packages /></PageWrap>} />
          <Route path="/gallery" element={<PageWrap><Gallery /></PageWrap>} />
          <Route path="/contact" element={<PageWrap><Contact /></PageWrap>} />
          <Route path="/admin" element={<PageWrap><Admin /></PageWrap>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default App
