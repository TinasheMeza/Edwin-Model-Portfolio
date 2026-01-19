import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import ImageWithFallback from './ImageWithFallback'

// Import campaign images
import campaign1 from '../Images/WT7A3108.jpeg'
import campaign2 from '../Images/IMG_9621.JPG'
import campaign3 from '../Images/WT7A2922(2).jpeg'
import campaign4 from '../Images/IMG_9622.JPG'
import campaign5 from '../Images/WT7A8875.jpeg'
import campaign6 from '../Images/IMG_7141.JPG'

const Campaigns = () => {
  const [hoveredId, setHoveredId] = useState(null)
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  // Campaign statistics
  const campaignStats = [
    { value: '50+', label: 'Total Campaigns', icon: '📸' },
    { value: '25+', label: 'Major Brands', icon: '🏆' },
    { value: '12', label: 'Countries', icon: '🌍' },
    { value: '100M+', label: 'Total Reach', icon: '👁️' },
  ]

  // Campaign data
  const campaigns = [
    {
      id: 1,
      brand: 'Versace',
      title: 'Spring/Summer Collection',
      year: '2024',
      role: 'Lead Model',
      coverImage: campaign1,
      description: 'Featured as the lead model in Versace\'s Spring/Summer campaign, shot in Milan with renowned photographer Mario Testino.',
      achievements: ['Billboard feature in Times Square', 'Featured in Vogue Italia', '15M+ social impressions'],
      color: 'from-yellow-500/20 to-amber-500/10',
    },
    {
      id: 2,
      brand: 'Hugo Boss',
      title: 'Urban Elegance',
      year: '2024',
      role: 'Campaign Face',
      coverImage: campaign2,
      description: 'The face of Hugo Boss\'s Urban Elegance menswear line, showcasing contemporary sophistication for the modern gentleman.',
      achievements: ['Global campaign', 'Featured in GQ', '20+ magazine features'],
      color: 'from-blue-500/20 to-cyan-500/10',
    },
    {
      id: 3,
      brand: 'Calvin Klein',
      title: 'Minimalist Series',
      year: '2023',
      role: 'Featured Model',
      coverImage: campaign3,
      description: 'Part of Calvin Klein\'s iconic minimalist campaign, emphasizing clean aesthetics and timeless style.',
      achievements: ['International print campaign', 'Digital campaign lead', '50+ billboards worldwide'],
      color: 'from-neutral-500/20 to-gray-500/10',
    },
    {
      id: 4,
      brand: 'Dior',
      title: 'Homme Collection',
      year: '2023',
      role: 'Runway & Print',
      coverImage: campaign4,
      description: 'Featured in Dior Homme\'s prestigious fashion show and subsequent print campaign during Paris Fashion Week.',
      achievements: ['Paris Fashion Week runway', 'Harper\'s Bazaar feature', 'Campaign video 5M+ views'],
      color: 'from-violet-500/20 to-purple-500/10',
    },
    {
      id: 5,
      brand: 'Gucci',
      title: 'Fall Collection',
      year: '2023',
      role: 'Campaign Model',
      coverImage: campaign5,
      description: 'Collaborated with Gucci for their Fall collection campaign, bringing eclectic luxury to life through bold imagery.',
      achievements: ['Milan showcase', 'Social media campaign', 'Limited edition poster'],
      color: 'from-green-500/20 to-emerald-500/10',
    },
    {
      id: 6,
      brand: 'Armani',
      title: 'Emporio Line',
      year: '2022',
      role: 'Lead Model',
      coverImage: campaign6,
      description: 'Lead model for Emporio Armani\'s contemporary collection, blending Italian craftsmanship with modern design.',
      achievements: ['Runway debut', 'Global advertising campaign', 'Ambassador role'],
      color: 'from-red-500/20 to-rose-500/10',
    },
  ]

  return (
    <section 
      id="campaigns"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-charcoal"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
      <div className="grid-overlay opacity-30" />
      
      {/* Floating Glow */}
      <motion.div 
        className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-3xl pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-150, 150]) }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
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
            Major Collaborations
          </motion.span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gradient mb-6">
            Campaigns
          </h2>
          <p className="text-warm-grey max-w-2xl mx-auto">
            A showcase of collaborations with world-renowned fashion houses and luxury brands,
            from runway shows to global advertising campaigns.
          </p>
        </motion.div>

        {/* Campaign Statistics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {campaignStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card p-6 text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className="text-3xl mb-2"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {stat.icon}
              </motion.div>
              <p className="text-3xl md:text-4xl font-display font-bold text-gradient-violet mb-1">
                {stat.value}
              </p>
              <p className="text-xs uppercase tracking-wider text-warm-grey">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign, index) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              index={index}
              isHovered={hoveredId === campaign.id}
              setHoveredId={setHoveredId}
            />
          ))}
        </div>

        {/* View More CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            className="btn-primary group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View All Campaigns
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

const CampaignCard = ({ campaign, index, isHovered, setHoveredId }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="glass-card overflow-hidden group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHoveredId(campaign.id)}
      onMouseLeave={() => setHoveredId(null)}
      layout
    >
      {/* Cover Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.div
          className="w-full h-full"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
        >
          <ImageWithFallback
            src={campaign.coverImage}
            alt={campaign.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Overlay Gradients */}
        <div className={`absolute inset-0 bg-gradient-to-t ${campaign.color}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        {/* Year Badge */}
        <motion.div
          className="absolute top-4 left-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="px-3 py-1 text-xs font-medium bg-violet-500/30 backdrop-blur-sm rounded-full text-violet-200 border border-violet-500/30">
            {campaign.year}
          </span>
        </motion.div>

        {/* Role Badge */}
        <motion.div
          className="absolute top-4 right-4"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm rounded-full text-white/80">
            {campaign.role}
          </span>
        </motion.div>
        
        {/* Brand & Title */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <motion.p 
            className="text-violet-400 text-sm uppercase tracking-wider mb-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {campaign.brand}
          </motion.p>
          <motion.h3 
            className="text-xl font-display font-bold text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {campaign.title}
          </motion.h3>
        </div>
      </div>

      {/* Content Section */}
      <motion.div className="p-5" layout>
        {/* Description Preview */}
        <p className="text-warm-grey text-sm leading-relaxed mb-4 line-clamp-2">
          {campaign.description}
        </p>

        {/* Expand Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-3 px-4 glass rounded-lg font-medium text-sm hover:bg-violet-500/10 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-white/80 group-hover/btn:text-violet-400 transition-colors">
            {isExpanded ? 'Show Less' : 'View Details'}
          </span>
          <motion.svg
            className="w-4 h-4 text-violet-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.button>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-5 space-y-4">
                {/* Full Description */}
                <p className="text-warm-grey text-sm leading-relaxed">
                  {campaign.description}
                </p>
                
                {/* Achievements */}
                <div>
                  <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                    <span className="w-4 h-px bg-violet-500" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {campaign.achievements.map((achievement, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-warm-grey"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Brand Stats */}
                <div className="grid grid-cols-3 gap-2 pt-3">
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <p className="text-lg font-bold text-gradient-violet">5M+</p>
                    <p className="text-[10px] uppercase text-warm-grey">Impressions</p>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <p className="text-lg font-bold text-gradient-violet">15+</p>
                    <p className="text-[10px] uppercase text-warm-grey">Countries</p>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <p className="text-lg font-bold text-gradient-violet">3</p>
                    <p className="text-[10px] uppercase text-warm-grey">Months</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hover Border Effect */}
      <motion.div
        className="absolute inset-0 border-2 border-violet-500/0 rounded-2xl pointer-events-none transition-colors duration-500"
        animate={{ borderColor: isHovered ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0)' }}
      />
    </motion.div>
  )
}

export default Campaigns
