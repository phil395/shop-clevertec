/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.tsx'
  ],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1110px'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'dark': '#121212',
      'grey': {
        100: '#F8F8F8',
        500: '#E5E5E5',
        900: '#9C9C9C'
      },
      'white': '#FFFFFF',
      'yellow': '#F0CC84',
      'pink': '#E91E63',
      'red': '#D61313',
      'green': '#0BB17F'
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
