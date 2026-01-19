/**
 * Centralized error handling utility
 * Logs errors in development, silent in production
 */

export const logError = (error, context = '') => {
  if (import.meta.env.DEV) {
    console.error(`[Error${context ? ` in ${context}` : ''}]:`, error)
  }
  // In production, you might want to send errors to an error tracking service
  // e.g., Sentry, LogRocket, etc.
}

export const handleAsyncError = (asyncFn, context = '') => {
  return async (...args) => {
    try {
      return await asyncFn(...args)
    } catch (error) {
      logError(error, context)
      throw error
    }
  }
}

export const safeExecute = (fn, fallback = null, context = '') => {
  try {
    return fn()
  } catch (error) {
    logError(error, context)
    return fallback
  }
}
