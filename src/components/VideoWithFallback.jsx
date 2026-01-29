import { useState, useRef, useEffect, memo, useCallback } from 'react'

/**
 * Video component with error handling and fallback
 * Similar to ImageWithFallback but for video elements
 */
const VideoWithFallback = memo(({ 
  src, 
  alt = 'Video',
  className = '', 
  onError,
  poster,
  autoPlay = false,
  loop = false,
  muted = false,
  controls = false,
  playsInline = true,
  preload = 'metadata',
  ...props 
}) => {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef(null)

  // Handle video load
  const handleLoadedData = useCallback(() => {
    setIsLoading(false)
  }, [])

  // Handle video error
  const handleError = useCallback((e) => {
    setHasError(true)
    setIsLoading(false)
    if (import.meta.env.DEV) {
      console.warn(`Video failed to load: ${src}`)
    }
    onError?.(e)
  }, [src, onError])

  // Handle video can play
  const handleCanPlay = useCallback(() => {
    setIsLoading(false)
  }, [])

  // No source provided
  if (!src) {
    return (
      <div className={`${className} bg-brown-950 flex items-center justify-center`}>
        <FallbackContent message="Video unavailable" />
      </div>
    )
  }

  // Error state
  if (hasError) {
    return (
      <div className={`${className} bg-brown-950 flex items-center justify-center`}>
        <FallbackContent message="Video failed to load" />
      </div>
    )
  }

  return (
    <div 
      className={`${className} relative overflow-hidden`}
      style={{ contain: 'layout paint' }}
    >
      {/* Loading placeholder */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-brown-900/50 flex items-center justify-center z-10"
          style={{
            backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(212, 165, 116, 0.05) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }}
        >
          <div className="w-12 h-12 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
        </div>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        src={src}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls={controls}
        playsInline={playsInline}
        preload={preload}
        onLoadedData={handleLoadedData}
        onError={handleError}
        onCanPlay={handleCanPlay}
        {...props}
      />
    </div>
  )
})

// Memoized fallback content
const FallbackContent = memo(({ message = 'Video unavailable' }) => (
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
        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
    <p className="text-warm-grey text-sm font-light">{message}</p>
  </div>
))

VideoWithFallback.displayName = 'VideoWithFallback'
FallbackContent.displayName = 'FallbackContent'

export default VideoWithFallback
