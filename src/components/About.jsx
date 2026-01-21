import { memo } from 'react'
import ImageWithFallback from './ImageWithFallback'
import { useInView, useLazyLoad } from '../hooks/useIntersectionObserver'
import { modelProfile, modelStats, campaigns, getExperienceString } from '../config/modelConfig'

// Import profile images
import profileImg1 from '../Images/WT7A3108.jpeg'
import profileImg2 from '../Images/IMG_9621.JPG'

// Work highlights based on actual campaigns
const workHighlights = [
  { name: 'Capitec', type: 'Commercial Campaign' },
  { name: 'Qeftys', type: 'Brand Campaign' },
  { name: 'Adidas x Cape Town FC', type: 'Sports Campaign' },
  { name: 'Adidas x Faculty FC', type: 'Sports Campaign' },
]

const About = memo(() => {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 })
  const [contentRef, contentInView] = useInView({ threshold: 0.1 })

  return (
    <section 
      id="about"
      className="section-padding relative overflow-hidden bg-brown-950"
    >
      {/* Background Elements - Static */}
      <div className="absolute inset-0 grid-overlay opacity-50" />
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-amber-500/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 md:mb-24 transition-all duration-700 ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-4 block font-light">
            Get to Know
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-gradient mb-6 tracking-tight">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-400 mx-auto rounded-full" />
        </div>

        {/* Main Content Grid */}
        <div 
          ref={contentRef}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start"
        >
          {/* Left Column - Images */}
          <ImageColumn isVisible={contentInView} />

          {/* Right Column - Content */}
          <ContentColumn isVisible={contentInView} />
        </div>
      </div>
    </section>
  )
})

// Memoized Image Column
const ImageColumn = memo(({ isVisible }) => {
  const [imageRef, imageLoaded] = useLazyLoad({ rootMargin: '100px' })

  return (
    <div 
      ref={imageRef}
      className={`relative transition-all duration-700 delay-100 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Main Image */}
      <div className="relative z-10">
        <div className="relative group overflow-hidden rounded-2xl">
          {imageLoaded && (
            <ImageWithFallback
              src={profileImg1}
              alt="Edwin Ndifon - Fashion Model"
              className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Glass Border Effect */}
          <div className="absolute inset-0 border border-amber-400/10 rounded-2xl pointer-events-none" />
        </div>
      </div>

      {/* Secondary Image - Desktop only */}
      <div 
        className={`
          absolute -bottom-8 -right-8 md:right-0 w-2/3 z-20 hidden md:block
          transition-all duration-700 delay-300
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        <div className="relative group overflow-hidden rounded-xl shadow-2xl hover:scale-[1.02] hover:-rotate-1 transition-transform duration-300">
          {imageLoaded && (
            <ImageWithFallback
              src={profileImg2}
              alt="Edwin Ndifon - Editorial"
              className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {/* Amber Glow on Hover */}
          <div className="absolute inset-0 border-2 border-amber-500/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute -top-8 -left-8 w-24 h-24 border border-amber-500/30 rounded-xl hidden lg:block" />
    </div>
  )
})

ImageColumn.displayName = 'ImageColumn'

// Memoized Content Column
const ContentColumn = memo(({ isVisible }) => {
  const yearsExperience = getExperienceString()
  
  return (
    <div 
      className={`space-y-10 transition-all duration-700 delay-200 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Bio */}
      <div>
        <p className="text-lg md:text-xl text-warm-grey leading-relaxed mb-6 font-light">
          {modelProfile.bio.full}
        </p>
        <p className="text-lg md:text-xl text-warm-grey leading-relaxed font-light">
          Based in {modelProfile.location}, I have built a solid foundation in the local 
          fashion and commercial industry, working with notable South African brands including 
          Capitec, Qeftys, and Adidas through collaborations with Cape Town FC and Faculty FC.
        </p>
      </div>

      {/* Model Statistics */}
      <div className="glass-card p-6 md:p-8">
        <h3 className="text-xl font-medium mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-amber-500" />
          Model Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {modelStats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-3 bg-brown-900/30 rounded-lg hover:bg-amber-500/10 transition-colors duration-300 hover:-translate-y-1 transition-transform"
              style={{ transitionDelay: `${index * 30}ms` }}
            >
              <p className="text-2xl font-medium text-gradient-amber">{stat.value}</p>
              <p className="text-xs text-warm-grey uppercase tracking-wider mt-1 font-light">
                {stat.label}
              </p>
              {stat.metric && (
                <p className="text-xs text-warm-grey/60 mt-0.5 font-light">{stat.metric}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Work Highlights */}
      <div className="glass-card p-6 md:p-8">
        <h3 className="text-xl font-medium mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-amber-500" />
          Campaign Highlights
        </h3>
        <div className="space-y-4">
          {workHighlights.map((work, index) => (
            <div
              key={work.name}
              className="flex items-center justify-between p-4 bg-brown-900/30 rounded-lg hover:bg-amber-500/10 transition-all duration-300 group cursor-default hover:translate-x-1"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-amber-500 group-hover:scale-150 transition-transform duration-300" />
                <div>
                  <p className="font-normal text-cream group-hover:text-amber-300 transition-colors">
                    {work.name}
                  </p>
                  <p className="text-sm text-warm-grey font-light">{work.type}</p>
                </div>
              </div>
              <span className="text-xs uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full font-light">
                Local
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Highlights */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { value: yearsExperience, label: 'Experience' },
          { value: '3', label: 'Major Brands' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="glass-card p-5 text-center hover:scale-105 hover:-translate-y-1 transition-transform duration-300"
          >
            <p className="text-3xl md:text-4xl font-medium text-gradient-amber">
              {stat.value}
            </p>
            <p className="text-xs uppercase tracking-wider text-warm-grey mt-2 font-light">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
})

ContentColumn.displayName = 'ContentColumn'
About.displayName = 'About'

export default About
