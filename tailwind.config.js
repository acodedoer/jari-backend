/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['"Balsamiq Sans"', 'cursive'] // Ensure fonts with spaces have " " surrounding it.
    },
    extend: {
      fontFamily: {
        'MyFont': ['"Balsamiq Sans"', 'cursive'] // Ensure fonts with spaces have " " surrounding it.
      },
      colors:{
        primary:"#FC6011",
        secondary: "#11263C",
        background: "#f0f5f9"
      }
    },
  },
  plugins: [],
}

