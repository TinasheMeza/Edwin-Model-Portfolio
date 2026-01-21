/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Rich warm brown background tones
        'charcoal': '#0d0906',
        'brown': {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#8b6b5c',
          800: '#6f5247',
          900: '#4a3428',
          950: '#2d1f18',
        },
        // Amber / Gold accent colors
        'amber': {
          DEFAULT: '#d4a574',
          50: '#fdf9f3',
          100: '#faecd9',
          200: '#f4d4ae',
          300: '#e8b87a',
          400: '#d4a574',
          500: '#c4935f',
          600: '#b67d4a',
          700: '#96633e',
          800: '#7a5038',
          900: '#654330',
          950: '#382116',
        },
        // Supporting colors
        'warm-grey': '#9c8b7e',
        'cream': '#f5ebe0',
        'gold': {
          DEFAULT: '#c9a962',
          light: '#e8d5a8',
          dark: '#9a7b3c',
        },
      },
      fontFamily: {
        'display': ['"Space Grotesk"', 'sans-serif'],
        'sans': ['"Space Grotesk"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'amber-glow': 'radial-gradient(circle at center, rgba(212, 165, 116, 0.15) 0%, transparent 70%)',
        'brown-gradient': 'linear-gradient(135deg, rgba(75, 52, 40, 0.5) 0%, rgba(13, 9, 6, 0.9) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'grid-fade': 'grid-fade 8s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4' },
          '100%': { opacity: '0.8' },
        },
        'grid-fade': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      boxShadow: {
        'amber': '0 0 20px rgba(212, 165, 116, 0.3)',
        'amber-lg': '0 0 40px rgba(212, 165, 116, 0.4)',
        'amber-glow': '0 0 60px rgba(212, 165, 116, 0.25)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'brown': '0 4px 30px rgba(75, 52, 40, 0.3)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
