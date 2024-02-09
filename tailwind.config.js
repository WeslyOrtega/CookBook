/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    colors: {
      primary: {
        lighter: "#fff7ed",
        light: "#ffedd5",
        DEFAULT: "#fed7aa",
        dark: "#fdba74",
        darker: "#fb923c",
      },
      secondary: {
        lighter: "#fef3c7",
        light: "#fde68a",
        DEFAULT: "#fcd34d",
        dark: "#fbbf24",
        darker: "#f59e0b",
      },
      accent: {
        lighter: "#dbeafe",
        light: "#bfdbfe",
        DEFAULT: "#93c5fd",
        dark: "#60a5fa",
        darker: "#3b82f6",
      },
    },
    extend: {},
  },
  plugins: [],
};
