/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: '#00BFFF',
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 191, 255, 0.35)',
      },
    },
  },
  plugins: [],
};
