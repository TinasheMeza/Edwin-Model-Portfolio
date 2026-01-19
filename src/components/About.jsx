import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import ImageWithFallback from './ImageWithFallback'

// Import profile images
import profileImg1 from '../Images/WT7A3108.jpeg'
import profileImg2 from '../Images/IMG_9621.JPG'

const About = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50])

  // Model statistics
  const modelStats = [
    { label: 'Height', value: '6\'2"', metric: '188 cm' },
    { label: 'Chest', value: '40"', metric: '102 cm' },
    { label: 'Waist', value: '32"', metric: '81 cm' },
    { label: 'Hips', value: '38"', metric: '97 cm' },
    { label: 'Shoe', value: 'US 11', metric: 'EU 44' },
    { label: 'Eyes', value: 'Brown', metric: null },
    { label: 'Hair', value: 'Black', metric: null },
  ]

  // Agency representation
  const agencies = [
    { name: 'Elite Models', location: 'New York', type: 'Mother Agency' },
    { name: 'Storm Management', location: 'London', type: 'Represented' },
    { name: 'Wilhelmina', location: 'Los Angeles', type: 'Represented' },
  ]

  // Animation variants
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
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-charcoal"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 grid-overlay opacity-50" />
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-violet-500/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
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
            Get to Know
          </motion.span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gradient mb-6">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-violet-400 mx-auto rounded-full" />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Column - Images */}
          <motion.div
            className="relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {/* Main Image */}
            <motion.div
              className="relative z-10"
              variants={itemVariants}
              style={{ y: imageY }}
            >
              <div className="relative group overflow-hidden rounded-2xl">
                <ImageWithFallback
                  src={profileImg1}
                  alt="Edwin Ndifon - Fashion Model"
                  className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Glass Border Effect */}
                <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
              </div>
            </motion.div>

            {/* Secondary Image - Floating */}
            <motion.div
              className="absolute -bottom-8 -right-8 md:right-0 w-2/3 z-20 hidden md:block"
              variants={itemVariants}
              whileHover={{ scale: 1.02, rotate: -1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative group overflow-hidden rounded-xl shadow-2xl">
                <ImageWithFallback
                  src={profileImg2}
                  alt="Edwin Ndifon - Editorial"
                  className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Violet Glow on Hover */}
                <div className="absolute inset-0 border-2 border-violet-500/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>

            {/* Decorative Element */}
            <div className="absolute -top-8 -left-8 w-24 h-24 border border-violet-500/30 rounded-xl hidden lg:block" />
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            className="space-y-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {/* Bio */}
            <motion.div variants={itemVariants}>
              <p className="text-lg md:text-xl text-warm-grey leading-relaxed mb-6">
                Edwin Ndifon is an international fashion model known for his distinctive 
                presence and exceptional versatility across editorial, commercial, and 
                high-fashion campaigns. With a natural charisma and strong editorial 
                aesthetic, Edwin brings depth and sophistication to every project.
              </p>
              <p className="text-lg md:text-xl text-warm-grey leading-relaxed">
                His portfolio spans collaborations with luxury fashion houses, prestigious 
                editorial publications, and global brand campaigns, consistently delivering 
                compelling visual narratives that resonate with contemporary audiences.
              </p>
            </motion.div>

            {/* Model Statistics */}
            <motion.div 
              className="glass-card p-6 md:p-8"
              variants={itemVariants}
            >
              <h3 className="text-xl font-display font-semibold mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-violet-500" />
                Model Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {modelStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-3 bg-white/5 rounded-lg hover:bg-violet-500/10 transition-colors duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -3 }}
                  >
                    <p className="text-2xl font-bold text-gradient-violet">{stat.value}</p>
                    <p className="text-xs text-warm-grey uppercase tracking-wider mt-1">
                      {stat.label}
                    </p>
                    {stat.metric && (
                      <p className="text-xs text-warm-grey/60 mt-0.5">{stat.metric}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Agency Representation */}
            <motion.div 
              className="glass-card p-6 md:p-8"
              variants={itemVariants}
            >
              <h3 className="text-xl font-display font-semibold mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-violet-500" />
                Agency Representation
              </h3>
              <div className="space-y-4">
                {agencies.map((agency, index) => (
                  <motion.div
                    key={agency.name}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-violet-500/10 transition-all duration-300 group cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-violet-500 group-hover:scale-150 transition-transform duration-300" />
                      <div>
                        <p className="font-medium text-white group-hover:text-violet-300 transition-colors">
                          {agency.name}
                        </p>
                        <p className="text-sm text-warm-grey">{agency.location}</p>
                      </div>
                    </div>
                    <span className="text-xs uppercase tracking-wider text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full">
                      {agency.type}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Experience Highlights */}
            <motion.div 
              className="grid grid-cols-3 gap-4"
              variants={itemVariants}
            >
              {[
                { value: '5+', label: 'Years Experience' },
                { value: '50+', label: 'Campaigns' },
                { value: '3', label: 'Continents' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="glass-card p-5 text-center"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-3xl md:text-4xl font-display font-bold text-gradient-violet">
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-warm-grey mt-2">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
