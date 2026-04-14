import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0A0A0A',
          50:  '#1A1A1A',
          100: '#111111',
          200: '#1A1A1A',
          300: '#2A2A2A',
          400: '#3A3A3A',
          500: '#4A4A4A',
        },
        gold: {
          DEFAULT: '#C8A96E',
          light:   '#D4B882',
          dark:    '#B8935A',
          muted:   '#A07840',
        },
        smoke: {
          DEFAULT: '#F5F5F5',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.05)' },
        },
      },
      animation: {
        'fade-in':    'fade-in 0.6s ease-out',
        'slide-up':   'slide-up 0.6s ease-out',
        shimmer:      'shimmer 2.5s infinite linear',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      backgroundImage: {
        'gold-gradient':    'linear-gradient(135deg, #C8A96E 0%, #D4B882 50%, #B8935A 100%)',
        'dark-gradient':    'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)',
        'surface-gradient': 'linear-gradient(135deg, #1A1A1A 0%, #111111 100%)',
      },
    },
  },
  plugins: [],
}

export default config
