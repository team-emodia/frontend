/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "colors-grays-white": "var(--colors-grays-white)",
      },
    },
  },
  plugins: [],
};
