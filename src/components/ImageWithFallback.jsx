import { useState } from 'react'

const ImageWithFallback = ({ src, alt, className, onError, ...props }) => {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = (e) => {
    setHasError(true)
    setIsLoading(false)
    if (import.meta.env.DEV) {
      console.warn(`Image failed to load: ${src}`)
    }
    if (onError) {
      onError(e)
    }
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  if (!src) {
    return (
      <div className={`${className || ''} bg-charcoal flex items-center justify-center`}>
        <div className="text-center p-8">
          <svg
            className="w-12 h-12 mx-auto mb-4 text-warm-grey"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-warm-grey text-sm">Image unavailable</p>
        </div>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className={`${className || ''} bg-charcoal flex items-center justify-center`}>
        <div className="text-center p-8">
          <svg
            className="w-12 h-12 mx-auto mb-4 text-warm-grey"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-warm-grey text-sm">Image unavailable</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className || ''} relative`}>
      {isLoading && (
        <div className="absolute inset-0 bg-charcoal animate-pulse" />
      )}
      <img
        src={src}
        alt={alt || 'Portfolio image'}
        className={`${className || ''} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
        {...props}
      />
    </div>
  )
}

export default ImageWithFallback
