module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      logo: ["Damion", "cursive"],
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
