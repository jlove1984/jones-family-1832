import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Colors
        heritage: {
          green: {
            DEFAULT: '#2D5016',
            light: '#4A8028',
          },
        },
        legacy: {
          gold: {
            DEFAULT: '#C19A6B',
            bright: '#D4B896',
          },
        },
        family: {
          burgundy: {
            DEFAULT: '#6B2E2E',
            light: '#9B4545',
          },
        },
        // Secondary Colors
        sage: {
          DEFAULT: '#8BA888',
          muted: '#6B9A68',
        },
        cream: {
          DEFAULT: '#F5F1E8',
          dark: '#2A2823',
        },
        terracotta: {
          DEFAULT: '#B85C38',
          soft: '#C97C5D',
        },
        // Neutral Colors
        charcoal: '#2C2C2C',
        'slate-gray': '#5A5A5A',
        'light-gray': '#D4D4D4',
        'off-white': '#FAFAFA',
        // Dark Theme
        'true-black': '#000000',
        'rich-black': '#0F0F0F',
        'dark-gray': '#1A1A1A',
        'medium-gray': '#2C2C2C',
        'light-text': '#E5E5E5',
        'muted-text': '#A3A3A3',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Courier New', 'monospace'],
      },
      fontSize: {
        'hero': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-mobile': ['40px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      spacing: {
        '18': '72px', // Header height
      },
      borderRadius: {
        'card': '12px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.08)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.12)',
        'card-dark': '0 2px 8px rgba(0,0,0,0.24)',
        'card-hover-dark': '0 4px 12px rgba(0,0,0,0.36)',
        'modal': '0 20px 60px rgba(0,0,0,0.3)',
        'modal-dark': '0 20px 60px rgba(0,0,0,0.6)',
        'button': '0 2px 4px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}

export default config
