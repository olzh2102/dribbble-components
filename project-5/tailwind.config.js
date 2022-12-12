/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './common/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#0d00fc', // blue
          200: '#000000', // black
          300: '#8c8f8f', // spanish gray
          400: '#bfc0c0', // silver
          500: '#f1f1f1', // cultured (pochti belyi)
          700: '#ddcfb9', // bone
          800: '#c49f5d', // camel
          900: '#ab6f00', // golden brown
        },
        secondary: {
          100: '#353535', // jet (pochti qara)
          200: '#505050', // spanish gray (temnee)
          300: '#ffffff', // white
          400: '#a9bcd0', // sky blue
          500: '#d2d7df', // light gray
          600: '#bdbbb0', // bone (temnee)
          700: '#8a897c', // bone (ewe temnee)
          800: colors.gray[400],
        },
      },
      boxShadow: {
        'active-menu-item': '0 0 3px 2px #7770ff',
        'dark-active-menu-item': '0 0 3px 2px #c49f5d',
      }
    },
  },
  plugins: [],
}
