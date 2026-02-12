/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8E7',
        mint: '#C8E6D0',
        sky: '#D4E9F7',
        pink: '#F5D4D4',
        butter: '#FFF4C4',
        coral: '#F4A261',
        brown: '#4A3F35',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
