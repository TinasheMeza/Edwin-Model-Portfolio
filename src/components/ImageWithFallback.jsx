import { useState, useRef, useEffect, memo, useCallback } from 'react'

/**
 * Optimized image component with:
 * - Native lazy loading
 * - Blur-up placeholder effect
 * - Intersection Observer for deferred loading
 * - Error handling with fallback
 * - Smooth fade-in transition
 */
const ImageWithFallback = memo(({ 
  src, 
  alt, 
  className = '', 
  onError, 
  priority = false,
  sizes,
  ...props 
}) => {
  const [loadState, setLoadState] = useState(priority ? 'loading' : 'idle')
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef(null)
  const observerRef = useRef(null)

  // Handle image load
  const handleLoad = useCallback(() => {
    setLoadState('loaded')
  }, [])

  // Handle image error
  const handleError = useCallback((e) => {
    setHasError(true)
    setLoadState('error')
    if (import.meta.env.DEV) {
      console.warn(`Image failed to load: ${src}`)
    }
    onError?.(e)
  }, [src, onError])

  // Setup intersection observer for lazy loading
  useEffect(() => {
    if (priority || loadState !== 'idle' || !imgRef.current) return

    // Use native IntersectionObserver for performance
    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setLoadState('loading')
              observerRef.current?.disconnect()
            }
          })
        },
        {
          rootMargin: '200px 0px', // Start loading 200px before entering viewport
          threshold: 0,
        }
      )

      observerRef.current.observe(imgRef.current)
    } else {
      // Fallback for older browsers
      setLoadState('loading')
    }

    return () => {
      observerRef.current?.disconnect()
    }
  }, [priority, loadState])

  // No source provided
  if (!src) {
    return (
      <div className={`${className} bg-brown-950 flex items-center justify-center`}>
        <FallbackContent />
      </div>
    )
  }

  // Error state
  if (hasError) {
    return (
      <div className={`${className} bg-brown-950 flex items-center justify-center`}>
        <FallbackContent />
      </div>
    )
  }

  const isLoading = loadState === 'idle' || loadState === 'loading'
  const shouldLoadImage = loadState === 'loading' || loadState === 'loaded'

  return (
    <div 
      ref={imgRef}
      className={`${className} relative overflow-hidden`}
      style={{ contain: 'layout paint' }}
    >
      {/* Blur placeholder / skeleton */}
      <div 
        className={`
          absolute inset-0 bg-brown-900/50 
          transition-opacity duration-500 ease-out
          ${loadState === 'loaded' ? 'opacity-0' : 'opacity-100'}
        `}
        style={{
          backgroundImage: isLoading 
            ? 'linear-gradient(90deg, transparent 0%, rgba(212, 165, 116, 0.05) 50%, transparent 100%)'
            : 'none',
          backgroundSize: '200% 100%',
          animation: isLoading ? 'shimmer 1.5s infinite' : 'none',
        }}
      />

      {/* Actual image - only render when in viewport */}
      {shouldLoadImage && (
        <img
          src={src}
          alt={alt || 'Portfolio image'}
          className={`
            ${className}
            transition-opacity duration-500 ease-out
            ${loadState === 'loaded' ? 'opacity-100' : 'opacity-0'}
          `}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          sizes={sizes}
          {...props}
        />
      )}
    </div>
  )
})

// Memoized fallback content
const FallbackContent = memo(() => (
  <div className="text-center p-8">
    <svg
      className="w-12 h-12 mx-auto mb-4 text-warm-grey"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
    <p className="text-warm-grey text-sm font-light">Image unavailable</p>
  </div>
))

ImageWithFallback.displayName = 'ImageWithFallback'
FallbackContent.displayName = 'FallbackContent'

export default ImageWithFallback
