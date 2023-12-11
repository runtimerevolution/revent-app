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
      },
      colors: {
        'light-grey': '#F3F3F4',
        'light-orange': '#FFAC53A1',
        'forest-green': '#00B05C',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
