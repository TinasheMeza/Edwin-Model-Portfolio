import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { throttle } from '../utils/performance'

const Navigation = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/campaigns', label: 'Campaigns' },
    { path: '/contact', label: 'Contact' },
  ]

  // Throttled scroll handler with passive listener
  const handleScroll = useCallback(
    throttle(() => {
      setIsScrolled(window.scrollY > 50)
    }, 100),
    []
  )

  useEffect(() => {
    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Main Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'py-4 bg-charcoal/80 backdrop-blur-xl border-b border-amber-400/5' 
            : 'py-6 bg-transparent'
        }`}
        style={{ 
          transform: 'translateZ(0)', // Force GPU layer
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="relative z-10 hover:opacity-80 transition-opacity"
          >
            <span className="text-xl md:text-2xl font-medium text-gradient tracking-tight">
              Edwin Ndifon
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                link={link} 
                isActive={location.pathname === link.path} 
              />
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="btn-outline text-sm py-2 px-6"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative z-10 w-10 h-10 flex items-center justify-center"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <div className="relative w-6 h-5">
              <span
                className={`absolute left-0 right-0 h-0.5 bg-cream rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-cream rounded-full transition-opacity duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 right-0 h-0.5 bg-cream rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'bottom-1/2 translate-y-1/2 -rotate-45' : 'bottom-0'
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-charcoal/95 backdrop-blur-xl"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Content */}
            <nav className="absolute inset-0 flex flex-col items-center justify-center gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`text-3xl font-medium transition-colors duration-300 ${
                      location.pathname === link.path 
                        ? 'text-gradient-amber' 
                        : 'text-cream hover:text-amber-400'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.25 }}
                className="mt-8"
              >
                <Link
                  to="/contact"
                  className="btn-primary"
                >
                  Book Now
                </Link>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="absolute bottom-12 flex gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.3 }}
              >
                <a
                  href="https://www.instagram.com/edwin.ndifon/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-warm-grey hover:text-amber-400 transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})

// Memoized nav link component
const NavLink = memo(({ link, isActive }) => (
  <Link
    to={link.path}
    className={`relative text-sm font-normal tracking-wide transition-colors duration-300 hover:-translate-y-0.5 transition-transform ${
      isActive 
        ? 'text-cream' 
        : 'text-warm-grey hover:text-cream'
    } ${link.path === '/gallery' ? 'px-4 py-2 bg-amber-500/10 rounded-full border border-amber-500/30 hover:bg-amber-500/20' : ''}`}
  >
    {link.label}
    {isActive && link.path !== '/gallery' && (
      <motion.div
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500"
        layoutId="activeSection"
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      />
    )}
  </Link>
))

Navigation.displayName = 'Navigation'
NavLink.displayName = 'NavLink'

export default Navigation
