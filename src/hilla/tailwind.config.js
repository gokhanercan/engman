/** @type {import('tailwindcss').Config} */
export default {
  content: ["./frontend/index.html", "./frontend/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
     colors: {
        primary: '#3490dc',
     },
    },
  },
  plugins: [],
};