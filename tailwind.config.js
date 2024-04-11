/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#e5e7eb',
        'label': '#6b7280',
        'primary': '#f97316',
      }
    },
  },
  plugins: [],
}
