/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-green': '#0E6635',
        'light-gray': '#FAFAF5',
        'yellow-gray': '#F3F4EE'
      },
    },
  },
  plugins: [],
}

