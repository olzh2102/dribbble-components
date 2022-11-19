/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
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
      }
    },
  },
  plugins: [],
}
