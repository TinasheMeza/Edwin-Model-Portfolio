import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useState, memo, useCallback, useEffect, useRef } from 'react'
import ImageWithFallback from './ImageWithFallback'
import { useLazyLoad, useInView } from '../hooks/useIntersectionObserver'
import { getExperienceString } from '../config/modelConfig'

// Import campaign poster-card images
import adidasPoster from '../Images/Adidas/poster-card.jpg'
import capeTownCityPoster from '../Images/Cape Town City/poster-card.jpeg'
import capitecPoster from '../Images/Capitec/poster-card.PNG'
import capitecVideo from '../Images/Capitec/49af2068-f53b-4498-9ed7-b51d5762c4cf.mov'
import saskoPoster from '../Images/Sasko/poster-card.PNG'

// Campaign statistics - based on actual work
const campaignStats = [
  { value: '4', label: 'Major Brands' },
  { value: '4', label: 'Campaigns' },
  { value: getExperienceString(), label: 'Experience' },
  { value: 'Cape Town', label: 'Based In' },
]

// Brand campaign data - only the 4 brands Edwin has worked with
const campaigns = [
  {
    id: 1,
    brand: 'Adidas',
    title: 'Brand Campaign',
    year: '2024',
    role: 'Featured Model',
    coverImage: adidasPoster,
    description: 'Collaborated with Adidas on brand campaigns, representing the intersection of sport and style. This work showcases athletic wear and street fashion in the local community.',
    achievements: ['Brand representation', 'Sports lifestyle campaign', 'Commercial work'],
    color: 'from-amber-500/20 to-amber-600/10',
    location: 'Cape Town, South Africa',
    type: 'Sports / Commercial',
  },
  {
    id: 2,
    brand: 'Cape Town City',
    title: 'Brand Campaign',
    year: '2024',
    role: 'Campaign Model',
    coverImage: capeTownCityPoster,
    description: 'Featured in Cape Town City brand campaigns, showcasing the vibrant local culture and community spirit of the Mother City.',
    achievements: ['Brand campaign', 'Local representation', 'Community engagement'],
    color: 'from-brown-500/20 to-brown-600/10',
    location: 'Cape Town, South Africa',
    type: 'Commercial',
  },
  {
    id: 3,
    brand: 'Capitec',
    title: 'Video Campaign',
    year: '2023',
    role: 'Featured Model',
    coverImage: capitecPoster,
    videoSrc: capitecVideo,
    description: 'Featured in Capitec\'s video campaign, representing the modern, aspirational South African consumer. This commercial campaign showcased the bank\'s commitment to accessibility and contemporary lifestyle.',
    achievements: ['Video campaign', 'Digital advertising', 'Brand representation'],
    color: 'from-warm-grey/20 to-brown-700/10',
    location: 'Cape Town, South Africa',
    type: 'Commercial',
    hasVideo: true,
  },
  {
    id: 4,
    brand: 'Sasko',
    title: 'Brand Campaign',
    year: '2024',
    role: 'Campaign Model',
    coverImage: saskoPoster,
    description: 'Collaborated with Sasko on brand campaigns, representing quality and authenticity in South African consumer products.',
    achievements: ['Brand campaign', 'Commercial work', 'Product representation'],
    color: 'from-gold/20 to-amber-700/10',
    location: 'Cape Town, South Africa',
    type: 'Commercial',
  },
]

const Campaigns = memo(() => {
  const [hoveredId, setHoveredId] = useState(null)
  const [headerRef, headerInView] = useInView({ threshold: 0.2 })
  const shouldReduceMotion = useReducedMotion()

  return (
    <section 
      id="campaigns"
      className="pt-12 md:pt-16 pb-24 md:pb-32 px-4 md:px-8 lg:px-16 relative overflow-hidden bg-brown-950"
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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef(null)

  const handleToggle = useCallback(() => {
    setIsExpanded(prev => !prev)
  }, [])

  // Handle video play on hover
  useEffect(() => {
    if (campaign.hasVideo && videoRef.current) {
      if (isHovered && !isVideoPlaying) {
        videoRef.current.play().catch(() => {
          // Autoplay may fail, that's okay
        })
        setIsVideoPlaying(true)
      } else if (!isHovered && isVideoPlaying) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
        setIsVideoPlaying(false)
      }
    }
  }, [isHovered, campaign.hasVideo, isVideoPlaying])

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
      {/* Cover Image/Video */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div
          className={`w-full h-full transition-transform duration-500 ${
            isHovered && !shouldReduceMotion ? 'scale-110' : 'scale-100'
          }`}
        >
          {isVisible && (
            campaign.hasVideo ? (
              <>
                {/* Poster image - shown when not hovering */}
                <ImageWithFallback
                  src={campaign.coverImage}
                  alt={campaign.title}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    isVideoPlaying ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                {/* Video - plays on hover */}
                <video
                  ref={videoRef}
                  src={campaign.videoSrc}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                    isVideoPlaying ? 'opacity-100' : 'opacity-0'
                  }`}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onError={(e) => {
                    if (import.meta.env.DEV) {
                      console.error('Video loading error:', e)
                    }
                  }}
                />
              </>
            ) : (
              <ImageWithFallback
                src={campaign.coverImage}
                alt={campaign.title}
                className={`w-full h-full ${
                  campaign.brand === 'Sasko' ? 'object-contain' : 'object-cover'
                }`}
              />
            )
          )}
        </div>
        
        {/* Overlay Gradients */}
        <div className={`absolute inset-0 bg-gradient-to-t ${campaign.color}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />

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
