/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#10c198',
          dark: '#0da782'
        }
      },
      boxShadow: {
        card: '0 4px 20px rgba(0,0,0,0.08)'
      }
    },
  },
  plugins: [],
}


