/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["autumn"],
  },
};
