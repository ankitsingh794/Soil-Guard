import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Soil Guard Brand Colors
        soil: {
          50: '#F9F7F4',
          100: '#F6F5F3',
          200: '#E8E4DD',
          300: '#D4CCC0',
          400: '#B8AA99',
          500: '#6B4F2D', // Primary earthy brown
          600: '#5A4025',
          700: '#49331E',
          800: '#382618',
          900: '#271A11',
        },
        botanical: {
          50: '#F0F7F4',
          100: '#E1F0E9',
          200: '#C3E1D3',
          300: '#A5D2BD',
          400: '#87C3A7',
          500: '#4A7C59', // Secondary botanical green
          600: '#3D6649',
          700: '#2F4F38',
          800: '#223928',
          900: '#152218',
        },
        sand: {
          50: '#FDFCFB',
          100: '#F6F5F3', // Neutral background
          200: '#EEEAE5',
          300: '#E6DFD7',
        },
        accent: {
          success: '#4A7C59',
          warning: '#D4972E',
          error: '#C84B31',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'hero-desktop': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        'hero-mobile': ['2rem', { lineHeight: '1.2', fontWeight: '700' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}

export default config
