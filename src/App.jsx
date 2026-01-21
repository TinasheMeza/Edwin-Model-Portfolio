import { useState, useEffect, useCallback, memo, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ErrorBoundary from './components/ErrorBoundary'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import { rafThrottle, isMobileDevice, prefersReducedMotion } from './utils/performance'

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const Gallery = lazy(() => import('./pages/Gallery'))
const CampaignsPage = lazy(() => import('./pages/CampaignsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

// Simple loading fallback
const PageLoader = memo(() => (
  <div className="min-h-screen bg-charcoal flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
  </div>
))

PageLoader.displayName = 'PageLoader'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()

  // Reduced loading time - only 800ms for smooth entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Scroll to top on route change - instant, no animation needed
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <ErrorBoundary>
      {/* Loading Screen - Simplified */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {/* Main Content */}
      <div 
        className="min-h-screen bg-charcoal"
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-out',
        }}
      >
        {/* Fixed Navigation */}
        <ErrorBoundary>
          <Navigation />
        </ErrorBoundary>

        {/* Main Sections with Route Transitions */}
        <main>
          <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                  <ErrorBoundary>
                    <Home />
                  </ErrorBoundary>
                } />
                <Route path="/gallery" element={
                  <ErrorBoundary>
                    <Gallery />
                  </ErrorBoundary>
                } />
                <Route path="/campaigns" element={
                  <ErrorBoundary>
                    <CampaignsPage />
                  </ErrorBoundary>
                } />
                <Route path="/contact" element={
                  <ErrorBoundary>
                    <ContactPage />
                  </ErrorBoundary>
                } />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>

        {/* Footer */}
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>

        {/* Cursor Glow Effect (Desktop Only) - Optimized */}
        <CursorGlow />
      </div>
    </ErrorBoundary>
  )
}

// Simplified loading screen with minimal animations
const LoadingScreen = memo(() => (
  <motion.div
    className="fixed inset-0 z-[100] bg-charcoal flex items-center justify-center"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
  >
    <div className="text-center">
      {/* Simple loading indicator */}
      <div className="relative mb-6">
        <div className="w-12 h-12 border-2 border-amber-500/30 rounded-lg" />
        <div 
          className="absolute inset-1 border-2 border-amber-500 rounded-md animate-spin"
          style={{ animationDuration: '1.5s' }}
        />
      </div>
      
      {/* Name */}
      <h1 className="text-2xl font-medium text-gradient tracking-tight">
        Edwin Ndifon
      </h1>
      
      {/* Loading Bar */}
      <div className="mt-4 w-32 h-0.5 bg-brown-900/50 rounded-full overflow-hidden mx-auto">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
          style={{
            animation: 'loadingBar 0.7s ease-out forwards',
          }}
        />
      </div>
    </div>
    
    <style>{`
      @keyframes loadingBar {
        from { width: 0%; }
        to { width: 100%; }
      }
    `}</style>
  </motion.div>
))

LoadingScreen.displayName = 'LoadingScreen'

// Optimized cursor glow with RAF throttling
const CursorGlow = memo(() => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  const handleMouseMove = useCallback(
    rafThrottle((e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }),
    [isVisible]
  )

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  useEffect(() => {
    // Skip on mobile, touch devices, or reduced motion preference
    if (typeof window === 'undefined') return
    if (isMobileDevice() || prefersReducedMotion()) return
    if (window.innerWidth < 1024) return

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.body.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      // Cancel any pending RAF
      handleMouseMove.cancel?.()
    }
  }, [handleMouseMove, handleMouseLeave])

  // Don't render on mobile or if not visible
  if (!isVisible) return null

  return (
    <div
      className="fixed w-[300px] h-[300px] rounded-full pointer-events-none z-[5] hidden lg:block"
      style={{
        background: 'radial-gradient(circle, rgba(212, 165, 116, 0.08) 0%, transparent 70%)',
        transform: `translate3d(${position.x - 150}px, ${position.y - 150}px, 0)`,
        opacity: 1,
        willChange: 'transform',
      }}
    />
  )
})

CursorGlow.displayName = 'CursorGlow'

export default App
