/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hti-accent': '#13a4ec',
        'hti-bg-light': '#f6f7f8',
        'hti-bg-dark': '#101c22',
        'hti-panel-dark': '#1a2a32',
        'hti-border-dark': '#2d4552',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
