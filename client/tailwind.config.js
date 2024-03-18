/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "inria-sans": "'Inria Sans'",
        jost: "Jost",
        inconsolata: "Inconsolata",
      }
    },
  },
  plugins: [],
}