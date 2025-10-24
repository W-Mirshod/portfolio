/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Modern 2025 Color Palette
        primary: {
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
          light: '#818cf8',
        },
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        
        // Surface colors - Modern Dark Theme
        surface: {
          DEFAULT: '#0a0a0a',
          elevated: '#111111',
          hover: '#1a1a1a',
        },
        
        // Text colors - Modern Dark Theme
        text: {
          primary: '#ffffff',
          secondary: '#e5e5e5',
          muted: '#a3a3a3',
        },
        
        // Border colors - Modern Dark Theme
        border: {
          DEFAULT: '#262626',
          light: '#404040',
        },
        
        // Legacy compatibility
        'bg-primary': '#0a0a0a',
        'bg-secondary': '#111111', 
        'bg-tertiary': '#1a1a1a',
        'text-primary': '#ffffff',
        'text-secondary': '#e5e5e5',
        'text-muted': '#a3a3a3',
        'border-color': '#262626',
        
        // Light theme colors (ULTRA DARK BLUE)
        'light-surface': '#1d4ed8',        /* Blue-700 - ultra dark background */
        'light-surface-elevated': '#1e40af', /* Blue-800 - deeper blue cards */
        'light-surface-hover': '#1e3a8a',   /* Blue-900 - even deeper blue */
        'light-text-primary': '#1e3a8a',    /* Blue-900 - dark blue text */
        'light-text-secondary': '#1e40af',  /* Blue-800 - medium blue */
        'light-text-muted': '#1e3a8a',      /* Blue-900 - darkest accent blue */
        'light-border': '#1d4ed8',          /* Blue-700 - strong blue border */
        'light-border-light': '#1e40af',   /* Blue-800 - lighter border */
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      boxShadow: {
        'neumorphism': '8px 8px 16px rgba(0, 0, 0, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.02)',
        'neumorphism-inset': 'inset 8px 8px 16px rgba(0, 0, 0, 0.4), inset -8px -8px 16px rgba(255, 255, 255, 0.02)',
        'neumorphism-hover': '12px 12px 24px rgba(0, 0, 0, 0.5), -12px -12px 24px rgba(255, 255, 255, 0.03)',
        'modern': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'modern-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
};
