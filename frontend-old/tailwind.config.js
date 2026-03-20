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
        primary: {
          DEFAULT: '#0a84ff',
          dark: '#0066cc',
          light: '#5eabff',
        },
        secondary: '#5e5ce6',
        accent: '#32ade6',
        success: '#30d158',
        warning: '#ffd60a',
        error: '#ff453a',
        surface: {
          DEFAULT: '#000000',
          elevated: '#1c1c1e',
          hover: '#2c2c2e',
        },
        text: {
          primary: '#ffffff',
          secondary: '#ebebf5',
          muted: 'rgba(235, 235, 245, 0.6)',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.15)',
          light: 'rgba(255, 255, 255, 0.20)',
        },
        'bg-primary': '#000000',
        'bg-secondary': '#1c1c1e',
        'bg-tertiary': '#2c2c2e',
        'text-primary': '#ffffff',
        'text-secondary': '#ebebf5',
        'text-muted': 'rgba(235, 235, 245, 0.6)',
        'border-color': 'rgba(255, 255, 255, 0.15)',
        'light-surface': '#d7e4ff',
        'light-surface-elevated': '#e9f0ff',
        'light-surface-hover': '#f2f6ff',
        'light-text-primary': '#16203b',
        'light-text-secondary': '#2e426f',
        'light-text-muted': '#4d6291',
        'light-border': 'rgba(255, 255, 255, 0.65)',
        'light-border-light': 'rgba(255, 255, 255, 0.88)',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
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
        'neumorphism': '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'neumorphism-inset': 'inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.35)',
        'neumorphism-hover': '0 12px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        'modern': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'modern-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '24px',
        'glass-strong': '36px',
      }
    },
  },
  plugins: [],
};
