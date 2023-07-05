/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [],
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './contexts/**/*.{js,ts,jsx,tsx}',
    './feature/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          white: '#FFFFFF',
          black: '#000000',
          milk: '#F7F5F2',
          zinc: '#353535',
        },
        action: {
          peach: '#E88D67',
          gold: '#DDA455'
        },
      },
    },
  },
}
