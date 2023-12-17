/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
  theme: {
    extend: {
      width: {
        '120': '30rem', 
        '150': '37.5rem',
      },
      height: {
        '120': '30rem', 
        '150': '37.5rem',
      },
    },
  },
  plugins: [],
}

