/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './common/**/*.{js,ts,jsx,tsx}',
    './contexts/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#0d00fc', // blue
          150: '#0b0ead',
          200: '#000000', // black
          250: '#b5b8bA', // svetlyi spanish gray
          300: '#8c8f8f', // spanish gray
          400: '#bfc0c0', // silver
          500: '#f1f1f1', // cultured (pochti belyi)
          700: '#ddcfb9', // bone
          800: '#c49f5d', // camel
          900: '#ab6f00', // golden brown
        },
        secondary: {
          50: '#2c2c2c', // (kōmir qara)
          100: '#353535', // jet (pochti qara)
          200: '#505050', // spanish gray (temnee)
          300: '#ffffff', // white
          400: '#a9bcd0', // sky blue
          500: '#d2d7df', // light gray
          600: '#bdbbb0', // bone (temnee)
          700: '#8a897c', // bone (ewe temnee)
          800: colors.gray[400],
          900: '#c9b2a6',
        },
      },
      boxShadow: {
        'active-menu-item': '0 0 3px 2px #7770ff',
        'dark-active-menu-item': '0 0 3px 2px #c49f5d',
      },
      animation: {
        'marquee-first': 'marquee 200s linear infinite',
        'marquee-second': 'marquee2 200s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
}
