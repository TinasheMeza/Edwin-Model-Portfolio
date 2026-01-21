import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useState, useRef, useEffect, useCallback, memo, useMemo } from 'react'
import ImageWithFallback from '../components/ImageWithFallback'
import { useLazyLoad } from '../hooks/useIntersectionObserver'
import { rafThrottle, isMobileDevice } from '../utils/performance'

// Import portfolio images
import img1 from '../Images/WT7A3108.jpeg'
import img2 from '../Images/IMG_9621.JPG'
import img3 from '../Images/WT7A2922(2).jpeg'
import img4 from '../Images/IMG_9622.JPG'
import img5 from '../Images/IMG_7123(1).JPG'
import img6 from '../Images/WT7A2912(2).jpeg'
import img7 from '../Images/IMG_9637.JPG'
import img8 from '../Images/IMG_7141.JPG'
import img9 from '../Images/IMG_9610.JPG'
import img10 from '../Images/IMG_7144.JPG'
import img11 from '../Images/IMG_7121.JPG'
import img12 from '../Images/IMG_7130.JPG'
import img13 from '../Images/IMG_7146.JPG'
import img14 from '../Images/WT7A2922(1).jpeg'
import img15 from '../Images/IMG_7120.JPG'
import img16 from '../Images/WT7A3063(4).jpeg'
import img17 from '../Images/WT7A8875.jpeg'
import img18 from '../Images/IMG_7151.JPG'
import img19 from '../Images/IMG_7122.JPG'
import img20 from '../Images/IMG_7123.JPG'
import img21 from '../Images/IMG_7124.JPG'
import img22 from '../Images/IMG_7125.JPG'
import img23 from '../Images/IMG_7126.JPG'
import img24 from '../Images/IMG_7127.JPG'

// Portfolio data - memoized to prevent recreating on each render
const portfolioItems = [
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
  { id: 19, src: img19, title: 'Modern Classic', category: 'Commercial' },
  { id: 20, src: img20, title: 'Fashion Forward', category: 'Editorial' },
  { id: 21, src: img21, title: 'Luxury Campaign', category: 'Commercial' },
  { id: 22, src: img22, title: 'Studio Session', category: 'Portrait' },
  { id: 23, src: img23, title: 'Couture Collection', category: 'Runway' },
  { id: 24, src: img24, title: 'Brand Story', category: 'Commercial' },
]

const categories = ['All', 'Editorial', 'Runway', 'Commercial', 'Portrait']

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState(null)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const shouldReduceMotion = useReducedMotion()

  // Memoize filtered items
  const filteredItems = useMemo(() => 
    activeCategory === 'All' 
      ? portfolioItems 
      : portfolioItems.filter(item => item.category === activeCategory),
    [activeCategory]
  )

  // Current image index
  const currentIndex = useMemo(() => 
    selectedImage ? filteredItems.findIndex(item => item.id === selectedImage.id) : -1,
    [selectedImage, filteredItems]
  )

  // Navigation handler
  const navigateImage = useCallback((direction) => {
    if (filteredItems.length === 0 || currentIndex === -1) return
    
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredItems.length
      : (currentIndex - 1 + filteredItems.length) % filteredItems.length
    
    setSelectedImage(filteredItems[newIndex])
  }, [currentIndex, filteredItems])

  // Swipe handling
  const minSwipeDistance = 50

  const onTouchStart = useCallback((e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }, [])

  const onTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }, [])

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > minSwipeDistance) navigateImage('next')
    if (distance < -minSwipeDistance) navigateImage('prev')
  }, [touchStart, touchEnd, navigateImage])

  // Keyboard navigation
  useEffect(() => {
    if (!selectedImage) return

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          setSelectedImage(null)
          break
        case 'ArrowLeft':
          navigateImage('prev')
          break
        case 'ArrowRight':
          navigateImage('next')
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, navigateImage])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedImage])

  return (
    <motion.div
      className="min-h-screen bg-charcoal pt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <section className="section-padding relative overflow-hidden">
        {/* Background - Static for performance */}
        <div className="grid-overlay opacity-20" />
        
        {/* Ambient glow - Static, no animation */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-4 block font-light">
              Portfolio Collection
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-gradient mb-6 tracking-tight">
              Gallery
            </h1>
            <p className="text-warm-grey max-w-2xl mx-auto font-light">
              A curated selection of editorial, runway, commercial, and portrait work 
              showcasing versatility and professional excellence.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`category-pill transition-all duration-200 ${
                  activeCategory === category 
                    ? 'category-pill-active' 
                    : 'category-pill-inactive'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <GalleryItem
                  key={item.id}
                  item={item}
                  index={index}
                  onImageClick={() => setSelectedImage(item)}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Results count */}
          <p className="text-center mt-8 text-warm-grey font-light">
            Showing {filteredItems.length} {filteredItems.length === 1 ? 'image' : 'images'}
            {activeCategory !== 'All' && ` in ${activeCategory}`}
          </p>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <Lightbox
            image={selectedImage}
            filteredItems={filteredItems}
            currentIndex={currentIndex}
            onClose={() => setSelectedImage(null)}
            onNavigate={navigateImage}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Memoized Gallery Item with lazy loading
const GalleryItem = memo(({ item, index, onImageClick, shouldReduceMotion }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [ref, isVisible] = useLazyLoad({ rootMargin: '100px' })
  const isMobile = isMobileDevice()

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-xl glass-card cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onImageClick}
      style={{ contain: 'layout paint' }}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {isVisible && (
          <ImageWithFallback
            src={item.src}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        
        {/* Hover Overlay */}
        <div 
          className={`
            absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent
            transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
        />
        
        {/* Content Overlay */}
        <div 
          className={`
            absolute bottom-0 left-0 right-0 p-5
            transition-all duration-300
            ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <span className="inline-block px-3 py-1 text-xs uppercase tracking-wider text-amber-300 bg-amber-500/20 backdrop-blur-sm rounded-full mb-2 font-light">
            {item.category}
          </span>
          <h3 className="text-xl font-medium text-cream">
            {item.title}
          </h3>
        </div>

        {/* View Icon */}
        <div 
          className={`
            absolute top-4 right-4
            transition-all duration-300
            ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
          `}
        >
          <div className="w-10 h-10 rounded-full glass-amber flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Border Effect */}
      <div 
        className={`
          absolute inset-0 rounded-xl border-2 pointer-events-none
          transition-colors duration-300
          ${isHovered ? 'border-amber-500/30' : 'border-transparent'}
        `}
      />
    </motion.div>
  )
})

GalleryItem.displayName = 'GalleryItem'

// Lightbox Component - Optimized
const Lightbox = memo(({ 
  image, 
  filteredItems, 
  currentIndex, 
  onClose, 
  onNavigate,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    onTouchStart={onTouchStart}
    onTouchMove={onTouchMove}
    onTouchEnd={onTouchEnd}
  >
    {/* Backdrop */}
    <div
      className="absolute inset-0 bg-charcoal/95 backdrop-blur-xl"
      onClick={onClose}
    />

    {/* Close Button */}
    <button
      className="absolute top-6 right-6 z-20 w-12 h-12 glass-strong rounded-full flex items-center justify-center hover:bg-amber-500/20 transition-colors group"
      onClick={onClose}
      aria-label="Close modal"
    >
      <svg className="w-6 h-6 text-cream group-hover:text-amber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    {/* Navigation Arrows */}
    {filteredItems.length > 1 && (
      <>
        <button
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 glass-strong rounded-full flex items-center justify-center hover:bg-amber-500/20 transition-colors group"
          onClick={() => onNavigate('prev')}
          aria-label="Previous image"
        >
          <svg className="w-6 h-6 text-cream group-hover:text-amber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 glass-strong rounded-full flex items-center justify-center hover:bg-amber-500/20 transition-colors group"
          onClick={() => onNavigate('next')}
          aria-label="Next image"
        >
          <svg className="w-6 h-6 text-cream group-hover:text-amber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </>
    )}

    {/* Image Container */}
    <motion.div
      className="relative z-10 max-w-6xl max-h-[85vh] w-full mx-4"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        <ImageWithFallback
          src={image.src}
          alt={image.title}
          className="w-full h-full object-contain max-h-[80vh]"
          priority
        />
        <div className="absolute inset-0 border border-amber-400/10 rounded-2xl pointer-events-none" />
      </div>
    </motion.div>

    {/* Image Info */}
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 glass-card px-6 py-4 flex items-center gap-6"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <span className="px-3 py-1 text-xs uppercase tracking-wider text-amber-300 bg-amber-500/20 rounded-full font-light">
        {image.category}
      </span>
      <h3 className="text-lg font-medium text-cream">
        {image.title}
      </h3>
      <span className="text-sm text-warm-grey font-light">
        {currentIndex + 1} / {filteredItems.length}
      </span>
    </motion.div>

    {/* Keyboard Hint - Desktop */}
    <div className="absolute bottom-4 right-4 text-xs text-warm-grey/50 hidden md:flex items-center gap-4 font-light">
      <span className="flex items-center gap-1">
        <kbd className="px-2 py-1 bg-brown-900/50 rounded text-[10px]">ESC</kbd>
        Close
      </span>
      {filteredItems.length > 1 && (
        <span className="flex items-center gap-1">
          <kbd className="px-2 py-1 bg-brown-900/50 rounded text-[10px]">←</kbd>
          <kbd className="px-2 py-1 bg-brown-900/50 rounded text-[10px]">→</kbd>
          Navigate
        </span>
      )}
    </div>

    {/* Mobile swipe hint */}
    <div className="absolute bottom-4 left-4 text-xs text-warm-grey/50 flex md:hidden items-center gap-1 font-light">
      Swipe to navigate
    </div>
  </motion.div>
))

Lightbox.displayName = 'Lightbox'

export default Gallery
