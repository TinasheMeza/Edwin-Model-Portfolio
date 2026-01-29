import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'
import ImageWithFallback from './ImageWithFallback'

const ImageModal = ({ image, onClose, allImages = [], onNavigate }) => {
  const [imageError, setImageError] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Find current index in allImages if navigation is enabled
  useEffect(() => {
    if (allImages.length > 0 && image) {
      const index = allImages.findIndex(img => img.id === image.id)
      if (index !== -1) setCurrentIndex(index)
    }
  }, [image, allImages])

  const navigateImage = useCallback((direction) => {
    if (allImages.length === 0) return
    
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % allImages.length
      : (currentIndex - 1 + allImages.length) % allImages.length
    
    setCurrentIndex(newIndex)
    if (onNavigate) onNavigate(allImages[newIndex])
  }, [currentIndex, allImages, onNavigate])

  useEffect(() => {
    if (!image) {
      onClose()
      return
    }

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          navigateImage('prev')
          break
        case 'ArrowRight':
          navigateImage('next')
          break
        default:
          break
      }
    }

    if (typeof document === 'undefined') return

    try {
      document.addEventListener('keydown', handleKeyDown)
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = originalOverflow || 'unset'
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error setting up modal:', error)
      }
    }
  }, [onClose, image, navigateImage])

  const currentImage = allImages.length > 0 ? allImages[currentIndex] : image

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-charcoal/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Grid Overlay */}
        <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

        {/* Close Button */}
        <motion.button
          className="absolute top-6 right-6 z-20 w-12 h-12 glass-strong rounded-full flex items-center justify-center hover:bg-amber-500/20 transition-all duration-300 group"
          onClick={onClose}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close modal"
        >
          <svg className="w-6 h-6 text-cream group-hover:text-amber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>

        {/* Navigation Arrows */}
        {allImages.length > 1 && (
          <>
            {/* Previous */}
            <motion.button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 glass-strong rounded-full flex items-center justify-center hover:bg-amber-500/20 transition-all duration-300 group"
              onClick={() => navigateImage('prev')}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous image"
            >
              <svg className="w-6 h-6 text-cream group-hover:text-amber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Next */}
            <motion.button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 glass-strong rounded-full flex items-center justify-center hover:bg-amber-500/20 transition-all duration-300 group"
              onClick={() => navigateImage('next')}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next image"
            >
              <svg className="w-6 h-6 text-cream group-hover:text-amber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </>
        )}

        {/* Image Container with Info Panel */}
        <div className="relative z-10 max-w-6xl max-h-[85vh] w-full mx-4 flex flex-col items-center">
          className={`${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => {
            e.stopPropagation()
            setIsZoomed(!isZoomed)
          }}
        >
          {/* Image Wrapper */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            animate={{ scale: isZoomed ? 1.5 : 1 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            {currentImage?.src ? (
              <ImageWithFallback
                src={currentImage.src}
                alt={currentImage.title || 'Portfolio image'}
                className="w-full h-full object-contain max-h-[80vh]"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-96 flex items-center justify-center glass-card">
                <p className="text-warm-grey font-light">Image not available</p>
              </div>
            )}

            {/* Decorative Border */}
            <div className="absolute inset-0 border border-amber-400/10 rounded-2xl pointer-events-none" />
          </motion.div>
        </motion.div>

        {/* Thumbnail Strip (for galleries with multiple images) */}
        {allImages.length > 4 && (
          <motion.div
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2 p-2 glass-card rounded-xl max-w-md overflow-x-auto scrollbar-hide"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            {allImages.slice(Math.max(0, currentIndex - 2), currentIndex + 3).map((img, idx) => {
              const actualIndex = Math.max(0, currentIndex - 2) + idx
              return (
                <motion.button
                  key={img.id}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentIndex(actualIndex)
                    if (onNavigate) onNavigate(allImages[actualIndex])
                  }}
                  className={`w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-300 ${
                    actualIndex === currentIndex 
                      ? 'border-amber-500 scale-110' 
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ImageWithFallback
                    src={img.src}
                    alt={img.title || 'Thumbnail'}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              )
            })}
          </motion.div>
        )}

        {/* Keyboard Hint */}
        <motion.div
          className="absolute bottom-4 right-4 text-xs text-warm-grey/50 hidden md:flex items-center gap-4 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-brown-900/50 rounded text-[10px]">ESC</kbd>
            Close
          </span>
          {allImages.length > 1 && (
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-brown-900/50 rounded text-[10px]">←</kbd>
              <kbd className="px-2 py-1 bg-brown-900/50 rounded text-[10px]">→</kbd>
              Navigate
            </span>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ImageModal
