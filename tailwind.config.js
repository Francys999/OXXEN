/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        oxxen: {
          bg: '#0a0e14',
          surface: '#11161f',
          surface2: '#161c27',
          border: '#232a37',
          accent: '#00e5a0',
          accent2: '#00b8ff',
          text: '#e6ebf2',
          muted: '#8a94a6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(0,229,160,0.15), 0 8px 24px -8px rgba(0,229,160,0.25)',
        card: '0 4px 20px -4px rgba(0,0,0,0.4)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-out both',
        slideUp: 'slideUp 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}
