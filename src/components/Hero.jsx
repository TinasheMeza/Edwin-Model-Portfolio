import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import heroImage from '../Images/hero-image.jpg'

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [imageError, setImageError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef(null)

  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300])
  const overlayOpacity = useTransform(scrollY, [0, 500], [0.6, 0.9])

  useEffect(() => {
    setIsLoaded(true)
    
    if (typeof window === 'undefined') return

    const handleMouseMove = (e) => {
      try {
        if (window.innerWidth && window.innerHeight) {
          setMousePosition({
            x: (e.clientX / window.innerWidth - 0.5) * 30,
            y: (e.clientY / window.innerHeight - 0.5) * 30,
          })
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Error handling mouse move:', error)
        }
      }
    }

    try {
      window.addEventListener('mousemove', handleMouseMove)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error setting up mouse listener:', error)
      }
    }
  }, [])

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <section 
      id="home"
      ref={containerRef}
      className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ y: backgroundY }}
      >
        {!imageError ? (
          <motion.img
            src={heroImage}
            alt="Edwin Ndifon - Fashion Model"
            className="w-full h-[120%] object-cover object-center"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ 
              scale: 1.1,
              opacity: 1,
              x: mousePosition.x * 0.3,
              y: mousePosition.y * 0.3,
            }}
            transition={{ 
              scale: { duration: 1.5, ease: 'easeOut' },
              opacity: { duration: 1.2 },
              x: { type: 'spring', stiffness: 50, damping: 20 },
              y: { type: 'spring', stiffness: 50, damping: 20 },
            }}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-charcoal via-black to-charcoal" />
        )}
      </motion.div>

      {/* Dark Overlays */}
      <motion.div 
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      
      {/* Animated Grid Overlay */}
      <div className="grid-overlay" />
      
      {/* Violet Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content Container */}
      <motion.div
        className="relative z-10 max-w-6xl mx-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
      >
        {/* Pre-title */}
        <motion.p
          className="text-violet-400 text-sm md:text-base uppercase tracking-[0.3em] mb-6"
          variants={itemVariants}
        >
          Fashion • Editorial • Campaigns
        </motion.p>

        {/* Main Title */}
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-8 leading-none"
          variants={itemVariants}
        >
          <span className="text-gradient block">Edwin</span>
          <span className="text-gradient-violet block mt-2">Ndifon</span>
        </motion.h1>

        {/* Decorative Lines */}
        <motion.div 
          className="flex items-center justify-center gap-4 mb-8"
          variants={itemVariants}
        >
          <motion.div
            className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-violet-500"
            variants={lineVariants}
          />
          <motion.div
            className="w-2 h-2 rotate-45 border border-violet-500 bg-violet-500/20"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 45 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />
          <motion.div
            className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-violet-500"
            variants={lineVariants}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-warm-grey max-w-2xl mx-auto mb-12 leading-relaxed"
          variants={itemVariants}
        >
          International fashion model represented by top agencies worldwide.
          Bringing elegance, versatility, and authentic presence to every project.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <motion.button
            onClick={scrollToPortfolio}
            className="btn-primary group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View Portfolio
              <motion.svg 
                className="w-4 h-4"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>
          </motion.button>
          
          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Now
          </motion.button>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto"
          variants={itemVariants}
        >
          {[
            { value: '6\'2"', label: 'Height' },
            { value: '5+', label: 'Years Exp' },
            { value: 'NYC', label: 'Based In' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
            >
              <p className="text-2xl md:text-3xl font-display font-bold text-gradient-violet">
                {stat.value}
              </p>
              <p className="text-xs uppercase tracking-wider text-warm-grey mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={scrollToPortfolio}
      >
        <motion.div
          className="flex flex-col items-center gap-3"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <span className="text-xs uppercase tracking-widest text-warm-grey">
            Scroll to explore
          </span>
          <div className="w-6 h-10 border-2 border-violet-500/50 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-3 bg-violet-500 rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Side Elements */}
      <motion.div
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-violet-500/50 to-transparent" />
        <a
          href="https://www.instagram.com/edwin.ndifon/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="text-warm-grey hover:text-violet-400 transition-colors duration-300"
        >
          <motion.svg 
            className="w-5 h-5"
            fill="currentColor" 
            viewBox="0 0 24 24"
            whileHover={{ scale: 1.2, rotate: 5 }}
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </motion.svg>
        </a>
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-violet-500/50 to-transparent" />
      </motion.div>

      {/* Right Side - Model Info */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="writing-mode-vertical text-xs uppercase tracking-[0.3em] text-warm-grey">
          International Model
        </div>
      </motion.div>

      {/* Vertical Text Style */}
      <style jsx>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </section>
  )
}

export default Hero
