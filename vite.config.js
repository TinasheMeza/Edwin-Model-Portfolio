import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
    strictPort: false,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Optimize chunk size
    chunkSizeWarningLimit: 500,
    // Use esbuild for minification (built-in, faster than terser)
    minify: 'esbuild',
    // esbuild minification options
    esbuild: {
      drop: ['console', 'debugger'],
    },
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom'],
          // React Router
          'router': ['react-router-dom'],
          // Framer Motion (largest dependency)
          'framer-motion': ['framer-motion'],
        },
        // Optimize asset file names for caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    // CSS code splitting
    cssCodeSplit: true,
    // Target modern browsers for smaller bundle
    target: 'es2020',
  },
  // Optimize image and video handling
  assetsInclude: [
    '**/*.jpg', '**/*.jpeg', '**/*.JPG', 
    '**/*.png', '**/*.PNG', 
    '**/*.gif', '**/*.svg', 
    '**/*.webp', '**/*.avif',
    '**/*.heic', '**/*.HEIC',
    '**/*.mp4', '**/*.MP4',
    '**/*.mov', '**/*.MOV',
    '**/*.webm', '**/*.WEBM'
  ],
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    // Force optimization of these
    esbuildOptions: {
      target: 'es2020',
    },
  },
  // Enable CSS optimization
  css: {
    devSourcemap: false,
  },
})
