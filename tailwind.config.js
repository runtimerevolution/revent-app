/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        sm: ['14px', '18px'],
        base: ['16px', '20px'],
        base1416: ['14px', '16.94px'],
      },
      colors: {
        grey: '#777777',
        'light-grey': '#F3F3F4',
        'forest-green': '#00B05C',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
