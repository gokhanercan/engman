/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/main/frontend/index.html", "./src/main/frontend/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
     colors: {
        primary: '#3490dc',
     },
    },
  },
  plugins: [],
};