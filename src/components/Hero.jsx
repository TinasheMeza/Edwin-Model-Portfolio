import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useEffect, useState, useRef, useCallback, memo } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../Images/hero-image.jpg'
import { rafThrottle, isMobileDevice } from '../utils/performance'
import { modelProfile } from '../config/modelConfig'

const Hero = memo(() => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [imageError, setImageError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollY } = useScroll()
  
  // Optimized parallax - use GPU-accelerated transform only
  const backgroundY = useTransform(
    scrollY, 
    [0, 1000], 
    shouldReduceMotion || isMobile ? [0, 0] : [0, 200]
  )
  const overlayOpacity = useTransform(scrollY, [0, 500], [0.5, 0.85])

  // Check for mobile on mount
  useEffect(() => {
    setIsMobile(isMobileDevice())
    setIsLoaded(true)
  }, [])

  // Throttled mouse move handler - only on desktop
  const handleMouseMove = useCallback(
    rafThrottle((e) => {
      if (isMobile || shouldReduceMotion) return
      
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setMousePosition({ x, y })
    }),
    [isMobile, shouldReduceMotion]
  )

  useEffect(() => {
    if (isMobile || shouldReduceMotion) return

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      handleMouseMove.cancel?.()
    }
  }, [handleMouseMove, isMobile, shouldReduceMotion])

  // Animation variants - simplified
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section 
      id="home"
      ref={containerRef}
      className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax - GPU accelerated */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ 
          y: backgroundY,
          willChange: 'transform',
        }}
      >
        {!imageError ? (
          <motion.img
            src={heroImage}
            alt="Edwin Ndifon - Fashion Model"
            className="w-full h-[120%] object-cover object-center"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ 
              scale: 1.05,
              opacity: 1,
            }}
            style={{
              // Use CSS transform for mouse movement - GPU accelerated
              transform: !isMobile && !shouldReduceMotion
                ? `translate3d(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px, 0) scale(1.05)`
                : 'scale(1.05)',
              transition: 'transform 0.3s ease-out',
            }}
            transition={{ 
              scale: { duration: 1, ease: 'easeOut' },
              opacity: { duration: 0.8 },
            }}
            onError={() => setImageError(true)}
            loading="eager"
            fetchPriority="high"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-brown-950 via-charcoal to-brown-950" />
        )}
      </motion.div>

      {/* Dark Overlays - Static, no animation needed */}
      <motion.div 
        className="absolute inset-0 bg-charcoal"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/30 via-transparent to-charcoal/30" />
      
      {/* Grid Overlay - Static for performance */}
      <div className="grid-overlay opacity-30" />
      
      {/* Ambient Glow - Simplified, no animation on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl animate-pulse-slow"
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: '2s' }}
          />
        </div>
      )}

      {/* Content Container */}
      <motion.div
        className="relative z-10 max-w-4xl mx-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
      >
        {/* Pre-title */}
        <motion.p
          className="text-amber-400 text-sm md:text-base uppercase tracking-[0.3em] mb-8 font-light"
          variants={itemVariants}
        >
          Fashion • Editorial • Campaigns
        </motion.p>

        {/* Decorative Lines */}
        <motion.div 
          className="flex items-center justify-center gap-4 mb-8"
          variants={itemVariants}
        >
          <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-amber-500" />
          <div className="w-2 h-2 rotate-45 border border-amber-500 bg-amber-500/20" />
          <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-amber-500" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl lg:text-2xl text-cream/90 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
          variants={itemVariants}
        >
          {modelProfile.bio.short}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <Link
            to="/gallery"
            className="btn-primary group inline-flex items-center"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Portfolio
              <svg 
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
          
          <Link
            to="/campaigns"
            className="btn-outline group inline-flex items-center gap-2"
          >
            View Campaigns
            <svg 
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - Simplified */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => {
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
        }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-warm-grey font-light">
            Scroll to explore
          </span>
          <div className="w-6 h-10 border-2 border-amber-500/50 rounded-full flex justify-center pt-2">
            <div
              className="w-1.5 h-3 bg-amber-500 rounded-full animate-bounce"
              style={{ animationDuration: '1.5s' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Side Elements - Desktop only */}
      <motion.div
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-amber-500/50 to-transparent" />
        <a
          href={modelProfile.socialLinks.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-warm-grey hover:text-amber-400 transition-colors duration-300"
          aria-label="Instagram"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        <a
          href={modelProfile.socialLinks.tiktok.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-warm-grey hover:text-amber-400 transition-colors duration-300"
          aria-label="TikTok"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
          </svg>
        </a>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-amber-500/50 to-transparent" />
      </motion.div>

      {/* Right Side - Model Info */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div 
          className="text-xs uppercase tracking-[0.3em] text-warm-grey font-light"
          style={{ writingMode: 'vertical-rl' }}
        >
          {modelProfile.location}
        </div>
      </motion.div>
    </section>
  )
})

Hero.displayName = 'Hero'

export default Hero
