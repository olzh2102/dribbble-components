/** @type {import('tailwindcss').Config} */
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
        'blue': {
          DEFAULT: 'purple',
          100: 'red',
          200: 'green'
        },
      },
      boxShadow: {
        'active-menu-item': '0 0 3px 2px #7770ff'
      }
    },
  },
  plugins: [],
}
