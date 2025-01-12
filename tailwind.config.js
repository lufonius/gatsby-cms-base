/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    fontFamily: {
      heading: ['"Bebas Neue"'],
      sans: ['Epilogue', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      borderRadius: {
        none: '0',
        'xs': '0.3rem',
        DEFAULT: '0.5rem',
        'm': '0.8rem'
      }
    }
  },
  plugins: [],
}