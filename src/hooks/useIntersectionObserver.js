import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Custom hook for Intersection Observer with performance optimizations
 * @param {Object} options - IntersectionObserver options
 * @param {boolean} options.triggerOnce - Only trigger once when element enters viewport
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Root margin for early triggering
 * @returns {[ref, isIntersecting, entry]}
 */
export const useIntersectionObserver = (options = {}) => {
  const {
    threshold = 0,
    root = null,
    rootMargin = '50px',
    triggerOnce = true,
    enabled = true,
  } = options

  const [isIntersecting, setIsIntersecting] = useState(false)
  const [entry, setEntry] = useState(null)
  const elementRef = useRef(null)
  const observerRef = useRef(null)
  const hasTriggered = useRef(false)

  const updateEntry = useCallback(([entry]) => {
    setEntry(entry)
    setIsIntersecting(entry.isIntersecting)

    if (triggerOnce && entry.isIntersecting && !hasTriggered.current) {
      hasTriggered.current = true
      // Disconnect observer after first trigger to save resources
      if (observerRef.current && elementRef.current) {
        observerRef.current.unobserve(elementRef.current)
      }
    }
  }, [triggerOnce])

  useEffect(() => {
    const node = elementRef.current
    
    if (!enabled || !node || typeof IntersectionObserver === 'undefined') {
      return
    }

    // Create observer
    observerRef.current = new IntersectionObserver(updateEntry, {
      threshold,
      root,
      rootMargin,
    })

    observerRef.current.observe(node)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [threshold, root, rootMargin, enabled, updateEntry])

  return [elementRef, isIntersecting, entry]
}

/**
 * Hook for lazy loading elements when they enter viewport
 */
export const useLazyLoad = (options = {}) => {
  const {
    rootMargin = '200px',
    threshold = 0,
  } = options

  const [ref, isIntersecting] = useIntersectionObserver({
    rootMargin,
    threshold,
    triggerOnce: true,
  })

  return [ref, isIntersecting]
}

/**
 * Hook for detecting if element is in viewport (for animations)
 */
export const useInView = (options = {}) => {
  const {
    rootMargin = '-50px',
    threshold = 0.1,
    triggerOnce = true,
  } = options

  return useIntersectionObserver({
    rootMargin,
    threshold,
    triggerOnce,
  })
}

export default useIntersectionObserver
