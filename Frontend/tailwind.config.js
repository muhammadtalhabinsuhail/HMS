/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        jost: ["Jost", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#fdf8f0",
          100: "#f9edda",
          200: "#f0d4a8",
          300: "#e5b877",
          400: "#d9954a",
          500: "#c4742a",
          600: "#a85c1f",
          700: "#8b4513",
          800: "#6d340e",
          900: "#4a2208",
        },
      },
    },
  },
  plugins: [],
};