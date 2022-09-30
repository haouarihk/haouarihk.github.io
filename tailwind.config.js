/** @type {import('tailwindcss').Config} */
module.exports = {
  darkmode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      darken: "",
      black: "#040406",
    },
  },
  plugins: [require("daisyui")],
};
