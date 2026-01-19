import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ErrorBoundary from './components/ErrorBoundary'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import Campaigns from './components/Campaigns'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ImageModal from './components/ImageModal'

// Import portfolio images for lightbox navigation
import img1 from './Images/WT7A3108.jpeg'
import img2 from './Images/IMG_9621.JPG'
import img3 from './Images/WT7A2922(2).jpeg'
import img4 from './Images/IMG_9622.JPG'
import img5 from './Images/IMG_7123(1).JPG'
import img6 from './Images/WT7A2912(2).jpeg'
import img7 from './Images/IMG_9637.JPG'
import img8 from './Images/IMG_7141.JPG'
import img9 from './Images/IMG_9610.JPG'
import img10 from './Images/IMG_7144.JPG'
import img11 from './Images/IMG_7121(2).JPG'
import img12 from './Images/IMG_7130.JPG'
import img13 from './Images/IMG_7146.JPG'
import img14 from './Images/WT7A2922(1).jpeg'
import img15 from './Images/IMG_7120.JPG'
import img16 from './Images/WT7A3063(4).jpeg'
import img17 from './Images/WT7A8875.jpeg'
import img18 from './Images/IMG_7151.JPG'

// All portfolio images for lightbox navigation
const allPortfolioImages = [
  { id: 1, src: img1, title: 'Fashion Week NYC', category: 'Runway' },
  { id: 2, src: img2, title: 'Urban Style', category: 'Editorial' },
  { id: 3, src: img3, title: 'Studio Portrait', category: 'Portrait' },
  { id: 4, src: img4, title: 'Brand Campaign', category: 'Commercial' },
  { id: 5, src: img5, title: 'Street Fashion', category: 'Editorial' },
  { id: 6, src: img6, title: 'Monochrome', category: 'Portrait' },
  { id: 7, src: img7, title: 'Designer Showcase', category: 'Runway' },
  { id: 8, src: img8, title: 'Classic Portrait', category: 'Portrait' },
  { id: 9, src: img9, title: 'Lifestyle Brand', category: 'Commercial' },
  { id: 10, src: img10, title: 'Editorial Spread', category: 'Editorial' },
  { id: 11, src: img11, title: 'Casual Elegance', category: 'Commercial' },
  { id: 12, src: img12, title: 'Dramatic Portrait', category: 'Portrait' },
  { id: 13, src: img13, title: 'Print Campaign', category: 'Commercial' },
  { id: 14, src: img14, title: 'High Fashion', category: 'Runway' },
  { id: 15, src: img15, title: 'Magazine Feature', category: 'Editorial' },
  { id: 16, src: img16, title: 'Artistic Vision', category: 'Portrait' },
  { id: 17, src: img17, title: 'Runway Walk', category: 'Runway' },
  { id: 18, src: img18, title: 'Editorial Look', category: 'Editorial' },
]

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate initial loading for smooth entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Handle image navigation in lightbox
  const handleImageNavigate = (newImage) => {
    setSelectedImage(newImage)
  }

  return (
    <ErrorBoundary>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              {/* Logo Animation */}
              <motion.div
                className="relative mb-8"
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                <div className="w-16 h-16 border-2 border-violet-500/30 rounded-xl" />
                <motion.div 
                  className="absolute inset-2 border-2 border-violet-500 rounded-lg"
                  animate={{ 
                    rotate: [0, -360],
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              </motion.div>
              
              {/* Name */}
              <motion.h1
                className="text-3xl font-display font-bold text-gradient"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Edwin Ndifon
              </motion.h1>
              
              {/* Loading Bar */}
              <motion.div 
                className="mt-6 w-48 h-0.5 bg-white/10 rounded-full overflow-hidden mx-auto"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-violet-400 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div 
        className="min-h-screen bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Fixed Navigation */}
        <ErrorBoundary>
          <Navigation />
        </ErrorBoundary>

        {/* Main Sections */}
        <main>
          <ErrorBoundary>
            <Hero />
          </ErrorBoundary>

          <ErrorBoundary>
            <Portfolio onImageClick={setSelectedImage} />
          </ErrorBoundary>

          <ErrorBoundary>
            <Campaigns />
          </ErrorBoundary>

          <ErrorBoundary>
            <About />
          </ErrorBoundary>

          <ErrorBoundary>
            <Contact />
          </ErrorBoundary>
        </main>

        {/* Footer */}
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <ErrorBoundary>
              <ImageModal 
                image={selectedImage} 
                onClose={() => setSelectedImage(null)}
                allImages={allPortfolioImages}
                onNavigate={handleImageNavigate}
              />
            </ErrorBoundary>
          )}
        </AnimatePresence>

        {/* Cursor Glow Effect (Desktop Only) */}
        <CursorGlow />
      </motion.div>
    </ErrorBoundary>
  )
}

// Custom cursor glow effect for desktop
function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show on desktop
    if (typeof window === 'undefined' || window.innerWidth < 1024) return

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed w-[300px] h-[300px] rounded-full pointer-events-none z-[5] hidden lg:block"
      style={{
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
        left: position.x - 150,
        top: position.y - 150,
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.2 }}
    />
  )
}

export default App
