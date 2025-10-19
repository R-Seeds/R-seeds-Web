/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontSize: {
        // Base font sizes
        'xs': '0.8rem',     // 12.8px
        'sm': '0.9375rem',  // 15px
        'base': '1.0625rem', // 17px (default is 1rem/16px)
        'lg': '1.25rem',    // 20px
        'xl': '1.5rem',     // 24px
        '2xl': '1.75rem',   // 28px
        '3xl': '2rem',      // 32px
        '4xl': '2.5rem',    // 40px
        '5xl': '3rem',      // 48px
      },
      lineHeight: {
        // Slightly increased line heights for better readability
        'tight': '1.25',
        'normal': '1.6',
        'relaxed': '1.75',
      },
      colors: {
        brand: {
          DEFAULT: '#10c198',
          dark: '#0da782'
        }
      },
      boxShadow: {
        card: '0 4px 20px rgba(0,0,0,0.08)'
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            fontSize: theme('fontSize.base'),
            lineHeight: theme('lineHeight.normal'),
            p: {
              marginTop: '1.5em',
              marginBottom: '1.5em',
            },
            h1: {
              fontSize: theme('fontSize.3xl'),
              fontWeight: '700',
              marginTop: '1.5em',
              marginBottom: '0.75em',
            },
            h2: {
              fontSize: theme('fontSize.2xl'),
              fontWeight: '600',
              marginTop: '1.5em',
              marginBottom: '0.75em',
            },
            h3: {
              fontSize: theme('fontSize.xl'),
              fontWeight: '600',
              marginTop: '1.5em',
              marginBottom: '0.5em',
            },
          },
        },
      }),
    },
  },
  plugins: [
    // Add plugins here when needed
  ],
}


