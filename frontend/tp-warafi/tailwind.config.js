/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
  theme: {
    extend: {
      colors: {
        'grey':'#DDBED4',
      },
      width: {
        '90': '23rem',
        '120': '30rem', 
        '140' : '35rem',
        '150': '37.5rem',
      },
      height: {
        '120': '30rem', 
        '150': '37.5rem',
      },
      translate:{
        '7.5' : '1.875rem',
      },
      screens: {
        'custom-sm': {'min': '200px', 'max': '600px'},
      }
    },
  },
  plugins: [],
}

