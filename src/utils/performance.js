/**
 * Performance utilities for optimizing animations and interactions
 */

/**
 * Throttle function - limits execution to once per specified interval
 * Uses requestAnimationFrame for smooth visual updates
 */
export const throttle = (func, limit) => {
  let inThrottle = false
  let lastFunc
  let lastRan
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      lastRan = Date.now()
      inThrottle = true
      
      setTimeout(() => {
        inThrottle = false
        if (lastFunc) {
          lastFunc()
          lastFunc = null
        }
      }, limit)
    } else {
      lastFunc = () => func.apply(this, args)
    }
  }
}

/**
 * RAF-based throttle for smooth visual updates
 */
export const rafThrottle = (callback) => {
  let requestId = null
  let lastArgs = null

  const later = () => {
    requestId = null
    callback(...lastArgs)
  }

  const throttled = (...args) => {
    lastArgs = args
    if (requestId === null) {
      requestId = requestAnimationFrame(later)
    }
  }

  throttled.cancel = () => {
    if (requestId) {
      cancelAnimationFrame(requestId)
      requestId = null
    }
  }

  return throttled
}

/**
 * Debounce function - delays execution until after wait period
 */
export const debounce = (func, wait, immediate = false) => {
  let timeout
  
  return function(...args) {
    const later = () => {
      timeout = null
      if (!immediate) func.apply(this, args)
    }
    
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    
    if (callNow) func.apply(this, args)
  }
}

/**
 * Check if device is low-end based on hardware concurrency and memory
 */
export const isLowEndDevice = () => {
  if (typeof navigator === 'undefined') return false
  
  const hardwareConcurrency = navigator.hardwareConcurrency || 4
  const deviceMemory = navigator.deviceMemory || 4
  
  return hardwareConcurrency <= 2 || deviceMemory <= 2
}

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Check if device is mobile
 */
export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768 || 'ontouchstart' in window
}

/**
 * Check if device supports touch
 */
export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/**
 * Get animation settings based on device capabilities
 */
export const getAnimationConfig = () => {
  const reducedMotion = prefersReducedMotion()
  const lowEnd = isLowEndDevice()
  const mobile = isMobileDevice()
  
  if (reducedMotion) {
    return {
      enableParallax: false,
      enableHoverEffects: false,
      enableComplexAnimations: false,
      transitionDuration: 0.1,
      staggerDelay: 0,
    }
  }
  
  if (lowEnd || mobile) {
    return {
      enableParallax: false,
      enableHoverEffects: true,
      enableComplexAnimations: false,
      transitionDuration: 0.2,
      staggerDelay: 0.02,
    }
  }
  
  return {
    enableParallax: true,
    enableHoverEffects: true,
    enableComplexAnimations: true,
    transitionDuration: 0.3,
    staggerDelay: 0.05,
  }
}

/**
 * Simple image preloader
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/**
 * Preload multiple images
 */
export const preloadImages = (sources, concurrency = 3) => {
  const queue = [...sources]
  const results = []
  let activeCount = 0

  return new Promise((resolve) => {
    const processNext = () => {
      if (queue.length === 0 && activeCount === 0) {
        resolve(results)
        return
      }

      while (activeCount < concurrency && queue.length > 0) {
        activeCount++
        const src = queue.shift()
        
        preloadImage(src)
          .then(img => results.push({ src, success: true, img }))
          .catch(() => results.push({ src, success: false }))
          .finally(() => {
            activeCount--
            processNext()
          })
      }
    }

    processNext()
  })
}
