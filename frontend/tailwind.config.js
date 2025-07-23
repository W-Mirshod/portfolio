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
        primary: '#3FA2F6',
        'primary-dark': '#2a8cd8',
        'bg-primary': '#0a0b0f',
        'bg-secondary': '#161822', 
        'bg-tertiary': '#1e2028',
        'text-primary': '#ffffff',
        'text-secondary': '#b8bcc8',
        'text-muted': '#8892a6',
        'border-color': '#2a2d37',
      },
      boxShadow: {
        'neumorphism': '8px 8px 16px rgba(0, 0, 0, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.02)',
        'neumorphism-inset': 'inset 8px 8px 16px rgba(0, 0, 0, 0.4), inset -8px -8px 16px rgba(255, 255, 255, 0.02)',
        'neumorphism-hover': '12px 12px 24px rgba(0, 0, 0, 0.5), -12px -12px 24px rgba(255, 255, 255, 0.03)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
};
