/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

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
    colors: {
        black: colors.black,
        white: colors.white,
        gray: colors.neutral,
        red: colors.red,
        green: colors.green,
        blue: colors.blue,
        orange: colors.orange
    },
    extend: {
      borderRadius: {
        none: '0',
        'xs': '0.3rem',
        DEFAULT: '0.45rem',
        'm': '0.8rem'
      }
    }
  },
  plugins: [],
}