import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import ImageWithFallback from './ImageWithFallback'

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
import img11 from '../Images/IMG_7121(2).JPG'
import img12 from '../Images/IMG_7130.JPG'
import img13 from '../Images/IMG_7146.JPG'
import img14 from '../Images/WT7A2922(1).jpeg'
import img15 from '../Images/IMG_7120.JPG'
import img16 from '../Images/WT7A3063(4).jpeg'
import img17 from '../Images/WT7A8875.jpeg'
import img18 from '../Images/IMG_7151.JPG'

const Portfolio = ({ onImageClick }) => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  // Categories for filtering
  const categories = ['All', 'Editorial', 'Runway', 'Commercial', 'Portrait']

  // Portfolio items with categories
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
  ]

  // Filter items based on active category
  const filteredItems = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory)

  return (
    <section 
      id="portfolio"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-charcoal/50 to-black" />
      <div className="grid-overlay opacity-30" />
      
      {/* Floating Glow */}
      <motion.div 
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-3xl pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="text-violet-400 text-sm uppercase tracking-[0.3em] mb-4 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Featured Work
          </motion.span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gradient mb-6">
            Portfolio
          </h2>
          <p className="text-warm-grey max-w-2xl mx-auto">
            A curated selection of editorial, runway, commercial, and portrait work 
            showcasing versatility and professional excellence.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`category-pill ${
                activeCategory === category 
                  ? 'category-pill-active' 
                  : 'category-pill-inactive'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              layout
            >
              {category}
              {activeCategory === category && (
                <motion.span
                  className="absolute inset-0 bg-violet-600 rounded-full -z-10"
                  layoutId="activeCategory"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <PortfolioItem
                key={item.id}
                item={item}
                index={index}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                onImageClick={onImageClick}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            className="btn-outline group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              View All Work
              <motion.svg 
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

const PortfolioItem = ({ item, index, hoveredIndex, setHoveredIndex, onImageClick, scrollYProgress }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const itemRef = useRef(null)

  // Subtle parallax effect based on row position
  const row = Math.floor(index / 3)
  const parallaxOffset = useTransform(scrollYProgress, [0, 1], [row * 20, row * -20])

  const handleMouseMove = (e) => {
    try {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15
      setMousePosition({ x, y })
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error handling mouse move:', error)
      }
    }
  }

  return (
    <motion.div
      ref={itemRef}
      className="relative overflow-hidden rounded-xl glass-card cursor-pointer group"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      onMouseMove={handleMouseMove}
      onClick={() => onImageClick(item)}
      whileHover={{ scale: 1.02 }}
      style={{ y: parallaxOffset }}
      layout
    >
      {/* Image Container with Parallax */}
      <motion.div
        className="relative aspect-[3/4] overflow-hidden"
        animate={{
          x: hoveredIndex === index ? mousePosition.x : 0,
          y: hoveredIndex === index ? mousePosition.y : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <ImageWithFallback
          src={item.src}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Violet Glow on Hover */}
        <motion.div 
          className="absolute inset-0 bg-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        
        {/* Content Overlay */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: hoveredIndex === index ? 1 : 0,
            y: hoveredIndex === index ? 0 : 20,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Category Badge */}
          <span className="inline-block px-3 py-1 text-xs uppercase tracking-wider text-violet-300 bg-violet-500/20 backdrop-blur-sm rounded-full mb-2">
            {item.category}
          </span>
          
          {/* Title */}
          <h3 className="text-xl font-display font-semibold text-white">
            {item.title}
          </h3>
        </motion.div>

        {/* View Icon */}
        <motion.div
          className="absolute top-4 right-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: hoveredIndex === index ? 1 : 0,
            scale: hoveredIndex === index ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-10 h-10 rounded-full glass-violet flex items-center justify-center">
            <svg className="w-5 h-5 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </motion.div>
      </motion.div>

      {/* Border Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-violet-500/0 group-hover:border-violet-500/30 transition-colors duration-500 pointer-events-none"
      />
    </motion.div>
  )
}

export default Portfolio
