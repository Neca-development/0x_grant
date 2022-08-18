/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#373737',
        'light-gray': '#F9F9F9',
        blue: '#1275D3',
      },
      translate: {
        center: '-25%',
      },
    },
  },
  plugins: [],
}
