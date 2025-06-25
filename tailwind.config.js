/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'elegant': {
          50: '#fafafa',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        'rose-gold': {
          50: '#fef7f3',
          100: '#fdeee6',
          200: '#f9d5c0',
          300: '#f4b794',
          400: '#ec8f66',
          500: '#e26c44',
          600: '#d55532',
          700: '#b24228',
          800: '#8f3926',
          900: '#743123',
        },
        'champagne': {
          50: '#fefdfb',
          100: '#fef9f2',
          200: '#fdf2e9',
          300: '#fae8d4',
          400: '#f6d5a7',
          500: '#f1c27d',
          600: '#e9a94b',
          700: '#d4881c',
          800: '#b16e0a',
          900: '#8f5902',
        },
        'cream': {
          50: '#fefcf9',
          100: '#fef8f3',
          200: '#fcf0e7',
          300: '#f9e4d4',
          400: '#f4d3b8',
          500: '#eec195',
          600: '#e3a56f',
          700: '#d1824a',
          800: '#b5693a',
          900: '#935532',
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}