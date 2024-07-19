/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      zIndex: {
        100: "100",
      },
      colors: {
        Whitesmoke: "#F5F5F5",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};