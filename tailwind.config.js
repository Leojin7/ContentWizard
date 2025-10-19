/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Varela Round', 'sans-serif'],
      },
      colors: {
        'dark': '#1A1D1F',
        'dark-2': '#272B30',
        'dark-3': '#343839',
        'light': '#F9FAFB',
        'light-2': '#EFEFEF',
        'light-3': '#F1F1F1',
        'gray-text': '#6F767E',
        'light-text': '#EFEFEF',
        'dark-text': '#1A1D1F',
        'green-light': '#E4F9F2',
        'green-dark': '#14B8A6',
        'red-light': '#FFF1F2',
        'red-dark': '#F43F5E',
        'blue-light': '#EFF6FF',
        'blue-dark': '#3B82F6',
        'yellow-light': '#FEF9C3',
        'yellow-dark': '#FBBF24',
        'purple-light': '#F3E8FF',
        'purple-dark': '#9333EA',
      },
    },
  },
  plugins: [],
}
