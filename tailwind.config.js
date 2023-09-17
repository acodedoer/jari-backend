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
      },
      animation:{
        remove: "remove 0.5s linear",
        reappear:"reappear 0.5s linear"
      },
      keyframes:{
        remove:{
          "0%":{opacity:1},
          "50%":{opacity:0.5},
          "100%":{opacity:0}
        },
        reappear:{
          "0%, 100%":{opacity:1},
          "50%":{opacity:0.5},
        }
      }
    },
  },
  
  plugins: [],
}

