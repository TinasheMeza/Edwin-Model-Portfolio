import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Safety check for root element
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found. Make sure index.html has a div with id="root"')
}

// Render app with error boundary and router
try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
} catch (error) {
  // Only log in development - production builds drop console statements
  if (import.meta.env.DEV) {
    console.error('Failed to render app:', error)
  }
  rootElement.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #0d0906; color: #f5ebe0; padding: 2rem; text-align: center;">
      <div>
        <h1 style="font-family: 'Space Grotesk', sans-serif;">Application Error</h1>
        <p style="font-family: 'Space Grotesk', sans-serif;">Failed to load the application. Please refresh the page.</p>
        <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #d4a574; color: #0d0906; border: none; border-radius: 4px; cursor: pointer; font-family: 'Space Grotesk', sans-serif;">
          Refresh Page
        </button>
      </div>
    </div>
  `
}
