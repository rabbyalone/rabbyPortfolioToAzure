/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#04060d',
          900: '#07090e',
          850: '#0d1017',
          800: '#121620',
          700: '#1e2536'
        },
        champagne: {
          100: '#f9f6f0',
          200: '#f1e8d6',
          300: '#dfc898',
          400: '#d0b378',
          500: '#b89b5e',
          600: '#92773e'
        },
        primary: {
          DEFAULT: '#E1E0CC',
          foreground: '#07090e'
        }
      },
      fontFamily: {
        heading: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif']
      }
    },
  },
  plugins: [],
}
