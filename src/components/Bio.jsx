import { memo } from 'react'
import { motion } from 'framer-motion'
import ImageWithFallback from './ImageWithFallback'
import { useInView, useLazyLoad } from '../hooks/useIntersectionObserver'
import { modelProfile, modelStats, getExperienceString } from '../config/modelConfig'

// Import bio image
import bioImage from '../Images/Bio.JPG'

const Bio = memo(() => {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 })
  const [contentRef, contentInView] = useInView({ threshold: 0.1 })

  return (
    <section 
      id="bio"
      className="section-padding relative overflow-hidden bg-gradient-to-b from-charcoal via-brown-950 to-charcoal"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 md:mb-20 transition-all duration-700 ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-4 block font-light">
            Model Profile
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-gradient mb-6 tracking-tight">
            {modelProfile.name}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-400 mx-auto rounded-full" />
        </div>

        {/* Comp Card Layout */}
        <div 
          ref={contentRef}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column - Portrait Image */}
          <CompCardImage isVisible={contentInView} />

          {/* Right Column - Model Info */}
          <CompCardInfo isVisible={contentInView} />
        </div>
      </div>
    </section>
  )
})

// Comp Card Image Component
const CompCardImage = memo(({ isVisible }) => {
  const [imageRef, imageLoaded] = useLazyLoad({ rootMargin: '100px' })

  return (
    <div 
      ref={imageRef}
      className={`relative transition-all duration-700 delay-100 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      }`}
    >
      {/* Main Image Container */}
      <div className="relative">
        {/* Decorative Frame */}
        <div className="absolute -inset-4 border border-amber-500/20 rounded-3xl" />
        <div className="absolute -inset-8 border border-amber-500/10 rounded-3xl hidden lg:block" />
        
        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl group">
          {imageLoaded && (
            <ImageWithFallback
              src={bioImage}
              alt={`${modelProfile.name} - Professional Portrait`}
              className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
          
          {/* Glass Border */}
          <div className="absolute inset-0 border border-amber-400/10 rounded-2xl" />
          
          {/* Name Badge - Bottom Left */}
          <motion.div 
            className="absolute bottom-6 left-6 glass-card px-5 py-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-2xl font-medium text-gradient tracking-tight">
              {modelProfile.name}
            </p>
            <p className="text-sm text-amber-400 font-light uppercase tracking-wider">
              {modelProfile.modelType}
            </p>
          </motion.div>
        </div>

        {/* Floating Stats Card - Desktop only */}
        <motion.div 
          className="absolute -right-6 top-1/4 glass-card p-4 hidden xl:block"
          initial={{ opacity: 0, x: 20 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="text-center">
            <p className="text-3xl font-medium text-gradient-amber">{modelProfile.measurements.height}</p>
            <p className="text-xs text-warm-grey uppercase tracking-wider mt-1 font-light">Height</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
})

CompCardImage.displayName = 'CompCardImage'

// Comp Card Info Component
const CompCardInfo = memo(({ isVisible }) => {
  // Dynamic experience calculation
  const yearsExperience = getExperienceString()

  return (
    <div 
      className={`space-y-8 transition-all duration-700 delay-200 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}
    >
      {/* Personal Details */}
      <div className="glass-card p-6 md:p-8">
        <h3 className="text-xl font-medium mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-amber-500" />
          Personal Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <InfoItem label="Full Name" value={modelProfile.fullName} />
          <InfoItem label="Age" value={`${modelProfile.age} Years`} />
          <InfoItem label="Location" value={modelProfile.location} />
          <InfoItem label="Experience" value={yearsExperience} highlight />
        </div>
      </div>

      {/* Measurements - Comp Card Style */}
      <div className="glass-card p-6 md:p-8">
        <h3 className="text-xl font-medium mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-amber-500" />
          Measurements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {modelStats.map((stat, index) => (
            <MeasurementCard 
              key={stat.label} 
              stat={stat} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>

      {/* Professional Bio */}
      <div className="glass-card p-6 md:p-8">
        <h3 className="text-xl font-medium mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-amber-500" />
          About
        </h3>
        <p className="text-lg text-warm-grey leading-relaxed font-light">
          {modelProfile.bio.full}
        </p>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <QuickStat value={yearsExperience} label="Experience" />
        <QuickStat value="3" label="Major Brands" />
        <QuickStat value="Cape Town" label="Based In" />
      </div>

      {/* Contact CTA */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <a
          href={`mailto:${modelProfile.contact.email}`}
          className="btn-primary flex-1 text-center group inline-flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Contact for Bookings
        </a>
        <a
          href={modelProfile.socialLinks.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline flex-1 text-center group inline-flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
            <circle cx="12" cy="12" r="3.5"/>
          </svg>
          Follow on Instagram
        </a>
      </motion.div>
    </div>
  )
})

CompCardInfo.displayName = 'CompCardInfo'

// Info Item Component
const InfoItem = memo(({ label, value, highlight = false }) => (
  <div className="p-3 bg-brown-900/30 rounded-lg">
    <p className="text-xs text-warm-grey uppercase tracking-wider mb-1 font-light">{label}</p>
    <p className={`font-normal ${highlight ? 'text-gradient-amber' : 'text-cream'}`}>{value}</p>
  </div>
))

InfoItem.displayName = 'InfoItem'

// Measurement Card Component
const MeasurementCard = memo(({ stat, index, isVisible }) => (
  <motion.div
    className="text-center p-4 bg-brown-900/30 rounded-xl hover:bg-amber-500/10 transition-all duration-300 group cursor-default"
    initial={{ opacity: 0, y: 10 }}
    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
    transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
    whileHover={{ y: -2 }}
  >
    <p className="text-xl md:text-2xl font-medium text-gradient-amber group-hover:scale-105 transition-transform">
      {stat.value}
    </p>
    <p className="text-xs text-warm-grey uppercase tracking-wider mt-1 font-light">
      {stat.label}
    </p>
    {stat.metric && (
      <p className="text-[10px] text-warm-grey/60 mt-0.5 font-light">{stat.metric}</p>
    )}
  </motion.div>
))

MeasurementCard.displayName = 'MeasurementCard'

// Quick Stat Component
const QuickStat = memo(({ value, label }) => (
  <div className="glass-card p-4 text-center hover:scale-105 transition-transform duration-300">
    <p className="text-xl md:text-2xl font-medium text-gradient-amber">{value}</p>
    <p className="text-xs uppercase tracking-wider text-warm-grey mt-1 font-light">{label}</p>
  </div>
))

QuickStat.displayName = 'QuickStat'
Bio.displayName = 'Bio'

export default Bio
