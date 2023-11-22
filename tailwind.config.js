/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: { grey: '#777777' },
      fontSize: {
        //FontSize, LineHeight
        base1416: ['14px', '16.94px'],
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
