import { useState, memo, useCallback } from 'react'
import { useInView } from '../hooks/useIntersectionObserver'
import { modelProfile } from '../config/modelConfig'

// Project types for dropdown
const projectTypes = [
  'Editorial / Magazine',
  'Fashion Campaign',
  'Runway / Fashion Show',
  'Commercial / Advertising',
  'Brand Collaboration',
  'Sports / Lifestyle',
  'Other'
]

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

const Contact = memo(() => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [headerRef, headerInView] = useInView({ threshold: 0.2 })

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSubmitted(true)
      
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: '',
          message: '',
        })
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  return (
    <section 
      id="contact"
      className="section-padding relative overflow-hidden"
    >
      {/* Background Effects - Static */}
      <div className="absolute inset-0 bg-gradient-to-b from-brown-950 via-charcoal to-brown-950" />
      <div className="grid-overlay opacity-30" />
      
      {/* Ambient Glows - Static */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-4 block font-light">
            Let's Work Together
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-gradient mb-6 tracking-tight">
            Book Me
          </h2>
          <p className="text-warm-grey max-w-2xl mx-auto font-light">
            Available for editorial shoots, runway shows, brand campaigns, and commercial projects.
            Get in touch to discuss your next project.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left Column - Contact Info */}
          <ContactInfo />

          {/* Right Column - Booking Form */}
          <BookingForm 
            formData={formData}
            submitted={submitted}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />
        </div>
      </div>
    </section>
  )
})

// Memoized Contact Info
const ContactInfo = memo(() => {
  const [ref, isVisible] = useInView({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`lg:col-span-2 space-y-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      }`}
    >
      {/* Direct Contact */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-medium mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-amber-500" />
          Direct Contact
        </h3>
        
        <div className="space-y-4">
          <a
            href={`mailto:${modelProfile.contact.email}`}
            className="flex items-center gap-4 p-4 bg-brown-900/30 rounded-xl hover:bg-amber-500/10 transition-all duration-300 group hover:translate-x-1"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-warm-grey font-light">Email</p>
              <p className="text-cream group-hover:text-amber-400 transition-colors">{modelProfile.contact.email}</p>
            </div>
          </a>
          
          {/* Location */}
          <div className="flex items-center gap-4 p-4 bg-brown-900/30 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-warm-grey font-light">Location</p>
              <p className="text-cream">{modelProfile.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-medium mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-amber-500" />
          Follow Me
        </h3>
        
        <div className="space-y-3">
          {socialLinks.map((social, index) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-brown-900/30 rounded-xl hover:bg-amber-500/10 transition-all duration-300 group hover:translate-x-1"
              style={{ transitionDelay: `${index * 30}ms` }}
            >
              <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-warm-grey group-hover:text-amber-400 transition-colors">
                {social.icon}
              </div>
              <div>
                <p className="text-cream group-hover:text-amber-400 transition-colors font-normal">{social.name}</p>
                <p className="text-sm text-warm-grey font-light">
                  {social.name === 'Instagram' ? modelProfile.socialLinks.instagram.handle : modelProfile.socialLinks.tiktok.handle}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Availability Status */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="absolute inset-0 w-3 h-3 rounded-full bg-amber-500 animate-ping" />
          </div>
          <p className="text-cream font-normal">{modelProfile.contact.availability}</p>
        </div>
        <p className="text-sm text-warm-grey mt-2 font-light">
          Based in Cape Town, available for local and regional projects
        </p>
      </div>

      {/* Model Type Badge */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-medium mb-4 flex items-center gap-3">
          <span className="w-8 h-px bg-amber-500" />
          Model Type
        </h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-4 py-2 bg-amber-500/20 text-amber-300 rounded-full text-sm font-light">Fashion</span>
          <span className="px-4 py-2 bg-amber-500/20 text-amber-300 rounded-full text-sm font-light">Commercial</span>
          <span className="px-4 py-2 bg-amber-500/20 text-amber-300 rounded-full text-sm font-light">Sports</span>
          <span className="px-4 py-2 bg-amber-500/20 text-amber-300 rounded-full text-sm font-light">Lifestyle</span>
        </div>
      </div>
    </div>
  )
})

ContactInfo.displayName = 'ContactInfo'

// Memoized Booking Form
const BookingForm = memo(({ formData, submitted, isSubmitting, onSubmit, onChange }) => {
  const [ref, isVisible] = useInView({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`lg:col-span-3 transition-all duration-700 delay-100 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}
    >
      <div className="glass-card p-8 md:p-10">
        <h3 className="text-2xl font-medium mb-8 flex items-center gap-3">
          <span className="w-8 h-px bg-amber-500" />
          Booking Inquiry
        </h3>

        {submitted ? (
          <SuccessMessage />
        ) : (
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Name & Email Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-normal mb-2 text-warm-grey">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  className="input-field"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-normal mb-2 text-warm-grey">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  className="input-field"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Company & Project Type */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company" className="block text-sm font-normal mb-2 text-warm-grey">
                  Company / Brand
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={onChange}
                  className="input-field"
                  placeholder="Your company"
                />
              </div>
              <div>
                <label htmlFor="projectType" className="block text-sm font-normal mb-2 text-warm-grey">
                  Project Type *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={onChange}
                  className="input-field appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled>Select project type</option>
                  {projectTypes.map(type => (
                    <option key={type} value={type} className="bg-brown-950">{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-normal mb-2 text-warm-grey">
                Project Details *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={onChange}
                rows="5"
                className="input-field resize-none"
                placeholder="Tell us about your project, vision, and any specific requirements..."
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn-primary py-4 text-lg group relative overflow-hidden disabled:opacity-50"
              disabled={isSubmitting}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Submit Inquiry
                    <svg 
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </span>
            </button>

            {/* Privacy Note */}
            <p className="text-xs text-warm-grey/60 text-center font-light">
              By submitting this form, you agree to be contacted regarding your inquiry.
              Your information will never be shared with third parties.
            </p>
          </form>
        )}
      </div>
    </div>
  )
})

BookingForm.displayName = 'BookingForm'

// Success Message
const SuccessMessage = memo(() => (
  <div className="text-center py-16">
    <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-6">
      <svg className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h4 className="text-2xl font-medium text-gradient mb-3">
      Thank You!
    </h4>
    <p className="text-warm-grey font-light">
      Your inquiry has been submitted. We'll get back to you within 24-48 hours.
    </p>
  </div>
))

SuccessMessage.displayName = 'SuccessMessage'
Contact.displayName = 'Contact'

export default Contact
