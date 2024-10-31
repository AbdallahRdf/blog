/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // scrollBehavior: ['responsive', 'scroll-smooth'],
    },
  },
  darkMode: 'selector',
  plugins: [
    require('@tailwindcss/typography')
  ],
}