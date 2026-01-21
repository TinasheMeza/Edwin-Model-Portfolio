/**
 * Edwin Ndifon - Model Profile Configuration
 * 
 * This file contains all profile data for Edwin Ndifon.
 * The experience calculation is dynamic and updates automatically each year.
 */

// Career start year - used for dynamic experience calculation
const CAREER_START_YEAR = 2022

/**
 * Calculate years of experience dynamically
 * @returns {number} Years of experience based on current year
 */
export const calculateYearsOfExperience = () => {
  const currentYear = new Date().getFullYear()
  return currentYear - CAREER_START_YEAR
}

/**
 * Get formatted experience string
 * @returns {string} Formatted experience (e.g., "4+ Years" or "4 Years")
 */
export const getExperienceString = () => {
  const years = calculateYearsOfExperience()
  return `${years}+ Years`
}

// Model Profile Information
export const modelProfile = {
  // Personal Information
  name: 'Edwin Ndifon',
  fullName: 'Edwin Ndifon',
  age: 24, // Update this as needed or calculate from birthdate
  location: 'Cape Town, South Africa',
  modelType: 'Fashion / Commercial',
  
  // Career Information
  careerStartYear: CAREER_START_YEAR,
  getYearsOfExperience: calculateYearsOfExperience,
  getExperienceString: getExperienceString,
  
  // Physical Measurements
  measurements: {
    height: '6\'1"',
    heightMetric: '185 cm',
    chest: '40"',
    chestMetric: '102 cm',
    waist: '32"',
    waistMetric: '81 cm',
    hips: '38"',
    hipsMetric: '97 cm',
    shoeSize: 'US 11',
    shoeSizeMetric: 'EU 44',
    hairColor: 'Black',
    eyeColor: 'Green',
  },
  
  // Professional Bio
  bio: {
    short: 'Cape Town-based fashion and commercial model bringing confidence, versatility, and authentic presence to every project.',
    full: 'I am a dynamic fashion and commercial model based in Cape Town, South Africa. With a natural charisma and strong editorial aesthetic, I bring depth and sophistication to every project. My portfolio spans collaborations with notable South African brands and campaigns, consistently delivering compelling visual narratives that resonate with contemporary audiences.',
  },
  
  // Contact Information
  contact: {
    email: 'edwinndifon5@icloud.com',
    availability: 'Currently Available for Bookings',
  },
  
  // Social Media Links
  socialLinks: {
    instagram: {
      url: 'https://www.instagram.com/edwin.ndifon/?hl=en',
      handle: '@edwin.ndifon',
    },
    tiktok: {
      url: 'https://www.tiktok.com/@eddy_one28',
      handle: '@eddy_one28',
    },
    // Note: Edwin does not have LinkedIn
  },
}

// Campaign Data - Local South African campaigns only
export const campaigns = [
  {
    id: 1,
    brand: 'Capitec',
    title: 'Banking Campaign',
    year: '2023',
    role: 'Featured Model',
    description: 'Featured in Capitec\'s marketing campaign, representing the modern, aspirational South African consumer.',
    type: 'Commercial',
    location: 'Cape Town, South Africa',
  },
  {
    id: 2,
    brand: 'Qeftys',
    title: 'Brand Campaign',
    year: '2023',
    role: 'Campaign Model',
    description: 'Collaborated with Qeftys for their brand campaign, showcasing contemporary streetwear and lifestyle aesthetics.',
    type: 'Fashion',
    location: 'Cape Town, South Africa',
  },
  {
    id: 3,
    brand: 'Adidas',
    title: 'Cape Town FC Collaboration',
    year: '2024',
    role: 'Featured Model',
    description: 'Part of Adidas\'s collaboration with Cape Town FC, representing the intersection of sport and style in the local football community.',
    type: 'Sports / Commercial',
    location: 'Cape Town, South Africa',
    collaboration: 'Cape Town FC',
  },
  {
    id: 4,
    brand: 'Adidas',
    title: 'Faculty FC Campaign',
    year: '2024',
    role: 'Team Member / Model',
    description: 'Featured in Adidas content as part of Faculty FC, a football collective I am actively involved with, blending sport culture with fashion.',
    type: 'Sports / Commercial',
    location: 'Cape Town, South Africa',
    collaboration: 'Faculty FC',
  },
]

// Campaign Statistics (based on actual work)
export const campaignStats = [
  { value: '3', label: 'Major Brands' },
  { value: campaigns.length.toString(), label: 'Campaigns' },
  { value: getExperienceString(), label: 'Experience' },
  { value: 'Cape Town', label: 'Based In' },
]

// Model Statistics for comp card display
export const modelStats = [
  { label: 'Height', value: modelProfile.measurements.height, metric: modelProfile.measurements.heightMetric },
  { label: 'Chest', value: modelProfile.measurements.chest, metric: modelProfile.measurements.chestMetric },
  { label: 'Waist', value: modelProfile.measurements.waist, metric: modelProfile.measurements.waistMetric },
  { label: 'Hips', value: modelProfile.measurements.hips, metric: modelProfile.measurements.hipsMetric },
  { label: 'Shoe', value: modelProfile.measurements.shoeSize, metric: modelProfile.measurements.shoeSizeMetric },
  { label: 'Eyes', value: modelProfile.measurements.eyeColor, metric: null },
  { label: 'Hair', value: modelProfile.measurements.hairColor, metric: null },
]

// SVG path data for social icons (use in components that render JSX)
export const socialIconPaths = {
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  tiktok: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z',
}

export default modelProfile
