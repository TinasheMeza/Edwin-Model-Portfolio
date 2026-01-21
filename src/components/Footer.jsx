import { memo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useIntersectionObserver'
import { modelProfile } from '../config/modelConfig'

// Social links - Instagram and TikTok only (no LinkedIn)
const socialLinks = [
  {
    name: 'Instagram',
    url: modelProfile.socialLinks.instagram.url,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    url: modelProfile.socialLinks.tiktok.url,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ),
  },
]

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Campaigns', path: '/campaigns' },
  { name: 'Contact', path: '/contact' },
]

const Footer = memo(() => {
  const currentYear = new Date().getFullYear()
  const [ref, isVisible] = useInView({ threshold: 0.1 })

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <footer className="relative overflow-hidden border-t border-amber-400/5">
      {/* Background - Static */}
      <div className="absolute inset-0 bg-gradient-to-b from-brown-950 to-charcoal" />
      <div className="grid-overlay opacity-20" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div 
          className={`py-16 px-4 md:px-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid md:grid-cols-3 gap-12">
            {/* Brand Column */}
            <div>
              <h3 className="text-2xl font-medium text-gradient mb-4 tracking-tight">
                {modelProfile.name}
              </h3>
              <p className="text-warm-grey mb-6 leading-relaxed font-light">
                {modelProfile.modelType} model based in {modelProfile.location}. Available for editorial, 
                commercial, and sports lifestyle projects.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass rounded-lg flex items-center justify-center text-warm-grey hover:text-amber-400 hover:bg-amber-500/10 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    style={{ transitionDelay: `${index * 30}ms` }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm uppercase tracking-wider text-cream font-normal mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-warm-grey hover:text-amber-400 transition-colors duration-300 flex items-center gap-2 group font-light"
                    >
                      <span className="w-0 h-px bg-amber-500 group-hover:w-4 transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-sm uppercase tracking-wider text-cream font-normal mb-6">
                Contact
              </h4>
              <div className="space-y-4">
                <a
                  href={`mailto:${modelProfile.contact.email}`}
                  className="text-warm-grey hover:text-amber-400 transition-colors duration-300 block font-light"
                >
                  {modelProfile.contact.email}
                </a>
                <div className="pt-4">
                  <p className="text-xs uppercase tracking-wider text-warm-grey/60 mb-2 font-light">
                    Location
                  </p>
                  <p className="text-cream font-normal">{modelProfile.location}</p>
                  <p className="text-warm-grey text-sm font-light">{modelProfile.modelType}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 px-4 md:px-8 border-t border-amber-400/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <p className="text-warm-grey text-sm font-light">
                © {currentYear} Edwin Ndifon. All rights reserved.
              </p>
              <span className="hidden sm:inline text-warm-grey/40">|</span>
              <p className="text-warm-grey/60 text-sm font-light">
                Powered by{' '}
                <a 
                  href="https://horizonwebservices.co.za" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 transition-colors duration-300"
                >
                  Horizon Web Services
                </a>
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-warm-grey font-light">
              <button 
                onClick={scrollToTop}
                className="hover:text-amber-400 transition-colors duration-300 flex items-center gap-2 group"
              >
                <span>Back to Top</span>
                <svg 
                  className="w-4 h-4 group-hover:-translate-y-1 transition-transform"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      </div>
    </footer>
  )
})

Footer.displayName = 'Footer'

export default Footer
