/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:
      {
        lightBlue: '#E9F1FA',  
        brightBlue: '#00ABE4', 
        white: '#FFFFFF',   
        navyblue : "#01257D"  ,
        electricblue :"#00FFFF"
      }
    },
  },
  plugins: [],
}