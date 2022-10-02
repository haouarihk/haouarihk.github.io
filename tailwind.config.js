/** @type {import('tailwindcss').Config} */
module.exports = {
  darkmode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darken: "",
        black: "#040406"
      }
    },
  },

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "orange",
          "primary-focus": "orange",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
