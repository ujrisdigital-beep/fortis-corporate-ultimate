/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './public/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1a365d',
        gold: '#D4AF37',
        cream: '#FBF7F0',
      },
    },
  },
  plugins: [],
}
