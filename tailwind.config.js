/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tuned for the #0d1117 background: 5.5:1 contrast (Tailwind default is 4:1).
        neutral: { 500: "#8a8a8a" },
      },
    },
  },
  plugins: [],
};
