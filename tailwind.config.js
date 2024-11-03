/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      primary: "#f3f3f3",
      secondary: "#32a873",
      danger: "#e3342f",
      background: "#242A32",
    },
    extend: {},
  },
  plugins: [],
};
