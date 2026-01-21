import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useState, memo, useCallback } from 'react'
import ImageWithFallback from './ImageWithFallback'
import { useLazyLoad, useInView } from '../hooks/useIntersectionObserver'
import { getExperienceString } from '../config/modelConfig'

// Import campaign images - using available images for campaigns
import capitecImg from '../Images/WT7A3108.jpeg'
import qeftysImg from '../Images/IMG_9621.JPG'
import adidasCtfcImg from '../Images/WT7A2922(2).jpeg'
import adidasFacultyImg from '../Images/IMG_9622.JPG'

// Campaign statistics - based on actual work
const campaignStats = [
  { value: '3', label: 'Major Brands' },
  { value: '4', label: 'Campaigns' },
  { value: getExperienceString(), label: 'Experience' },
  { value: 'Cape Town', label: 'Based In' },
]

// Actual campaign data - South African brands only
const campaigns = [
  {
    id: 1,
    brand: 'Capitec',
    title: 'Banking Campaign',
    year: '2023',
    role: 'Featured Model',
    coverImage: capitecImg,
    description: 'Featured in Capitec\'s marketing campaign, representing the modern, aspirational South African consumer. This commercial campaign showcased the bank\'s commitment to accessibility and contemporary lifestyle.',
    achievements: ['National print campaign', 'Digital advertising', 'Brand representation'],
    color: 'from-amber-500/20 to-amber-600/10',
    location: 'Cape Town, South Africa',
    type: 'Commercial',
  },
  {
    id: 2,
    brand: 'Qeftys',
    title: 'Brand Campaign',
    year: '2023',
    role: 'Campaign Model',
    coverImage: qeftysImg,
    description: 'Collaborated with Qeftys for their brand campaign, showcasing contemporary streetwear and lifestyle aesthetics that resonate with the modern South African youth culture.',
    achievements: ['Lookbook feature', 'Social media content', 'Brand ambassador'],
    color: 'from-brown-500/20 to-brown-600/10',
    location: 'Cape Town, South Africa',
    type: 'Fashion',
  },
  {
    id: 3,
    brand: 'Adidas',
    title: 'Cape Town FC Collaboration',
    year: '2024',
    role: 'Featured Model',
    coverImage: adidasCtfcImg,
    description: 'Part of Adidas\'s collaboration with Cape Town FC, representing the intersection of sport and style in the local football community. This campaign highlighted the connection between athletic wear and street fashion.',
    achievements: ['Team kit launch', 'Sports lifestyle campaign', 'Local football community'],
    color: 'from-warm-grey/20 to-brown-700/10',
    location: 'Cape Town, South Africa',
    type: 'Sports / Commercial',
    collaboration: 'Cape Town FC',
  },
  {
    id: 4,
    brand: 'Adidas',
    title: 'Faculty FC Campaign',
    year: '2024',
    role: 'Team Member / Model',
    coverImage: adidasFacultyImg,
    description: 'Featured in Adidas content as part of Faculty FC, a football collective I am actively involved with. This campaign blends sport culture with fashion, showcasing authentic participation in the local football scene.',
    achievements: ['Authentic representation', 'Community football culture', 'Adidas partnership'],
    color: 'from-gold/20 to-amber-700/10',
    location: 'Cape Town, South Africa',
    type: 'Sports / Commercial',
    collaboration: 'Faculty FC',
  },
]

const Campaigns = memo(() => {
  const [hoveredId, setHoveredId] = useState(null)
  const [headerRef, headerInView] = useInView({ threshold: 0.2 })
  const shouldReduceMotion = useReducedMotion()

  return (
    <section 
      id="campaigns"
      className="section-padding relative overflow-hidden bg-brown-950"
    >
      {/* Background Effects - Static */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-transparent to-charcoal/50" />
      <div className="grid-overlay opacity-30" />
      
      {/* Ambient Glow - Static for performance */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-4 block font-light">
            Brand Collaborations
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-gradient mb-6 tracking-tight">
            Campaigns
          </h2>
          <p className="text-warm-grey max-w-2xl mx-auto font-light">
            A showcase of collaborations with notable South African brands,
            from commercial campaigns to sports partnerships in Cape Town.
          </p>
        </div>

        {/* Campaign Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {campaignStats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign, index) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              index={index}
              isHovered={hoveredId === campaign.id}
              setHoveredId={setHoveredId}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
})

// Memoized Stat Card
const StatCard = memo(({ stat, index }) => {
  const [ref, isVisible] = useInView({ threshold: 0.3 })

  return (
    <div
      ref={ref}
      className={`
        glass-card p-6 text-center
        transition-all duration-500 hover:scale-105 hover:-translate-y-1
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <p className="text-3xl md:text-4xl font-medium text-gradient-amber mb-1">
        {stat.value}
      </p>
      <p className="text-xs uppercase tracking-wider text-warm-grey font-light">
        {stat.label}
      </p>
    </div>
  )
})

StatCard.displayName = 'StatCard'

// Memoized Campaign Card
const CampaignCard = memo(({ campaign, index, isHovered, setHoveredId, shouldReduceMotion }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [ref, isVisible] = useLazyLoad({ rootMargin: '100px' })

  const handleToggle = useCallback(() => {
    setIsExpanded(prev => !prev)
  }, [])

  return (
    <div
      ref={ref}
      className={`
        glass-card overflow-hidden group
        transition-all duration-500
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ 
        transitionDelay: `${Math.min(index * 80, 400)}ms`,
        contain: 'layout paint',
      }}
      onMouseEnter={() => setHoveredId(campaign.id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      {/* Cover Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div
          className={`w-full h-full transition-transform duration-500 ${
            isHovered && !shouldReduceMotion ? 'scale-110' : 'scale-100'
          }`}
        >
          {isVisible && (
            <ImageWithFallback
              src={campaign.coverImage}
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        
        {/* Overlay Gradients */}
        <div className={`absolute inset-0 bg-gradient-to-t ${campaign.color}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
        
        {/* Year Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-normal bg-amber-500/30 backdrop-blur-sm rounded-full text-amber-200 border border-amber-500/30">
            {campaign.year}
          </span>
        </div>

        {/* Role Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 text-xs font-normal bg-brown-900/50 backdrop-blur-sm rounded-full text-cream/80">
            {campaign.role}
          </span>
        </div>
        
        {/* Brand & Title */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-amber-400 text-sm uppercase tracking-wider mb-1 font-light">
            {campaign.brand}
          </p>
          <h3 className="text-xl font-medium text-cream">
            {campaign.title}
          </h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Description Preview */}
        <p className="text-warm-grey text-sm leading-relaxed mb-4 line-clamp-2 font-light">
          {campaign.description}
        </p>

        {/* Expand Button */}
        <button
          onClick={handleToggle}
          className="w-full py-3 px-4 glass rounded-lg font-normal text-sm hover:bg-amber-500/10 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
        >
          <span className="text-cream/80 group-hover/btn:text-amber-400 transition-colors">
            {isExpanded ? 'Show Less' : 'View Details'}
          </span>
          <svg
            className={`w-4 h-4 text-amber-400 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-5 space-y-4">
                {/* Full Description */}
                <p className="text-warm-grey text-sm leading-relaxed font-light">
                  {campaign.description}
                </p>
                
                {/* Achievements */}
                <div>
                  <h4 className="text-sm font-normal text-cream mb-3 flex items-center gap-2">
                    <span className="w-4 h-px bg-amber-500" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {campaign.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-warm-grey font-light"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Campaign Details */}
                <div className="grid grid-cols-2 gap-2 pt-3">
                  <div className="text-center p-3 bg-brown-900/30 rounded-lg">
                    <p className="text-sm font-medium text-gradient-amber">{campaign.type}</p>
                    <p className="text-[10px] uppercase text-warm-grey font-light">Type</p>
                  </div>
                  <div className="text-center p-3 bg-brown-900/30 rounded-lg">
                    <p className="text-sm font-medium text-gradient-amber">{campaign.location?.split(',')[0] || 'Cape Town'}</p>
                    <p className="text-[10px] uppercase text-warm-grey font-light">Location</p>
                  </div>
                </div>
                
                {/* Collaboration Partner Badge */}
                {campaign.collaboration && (
                  <div className="mt-3 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <p className="text-xs text-amber-400 uppercase tracking-wider font-light">In collaboration with</p>
                    <p className="text-sm font-medium text-cream mt-1">{campaign.collaboration}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hover Border Effect */}
      <div
        className={`
          absolute inset-0 border-2 rounded-2xl pointer-events-none
          transition-colors duration-300
          ${isHovered ? 'border-amber-500/30' : 'border-transparent'}
        `}
      />
    </div>
  )
})

CampaignCard.displayName = 'CampaignCard'
Campaigns.displayName = 'Campaigns'

export default Campaigns
