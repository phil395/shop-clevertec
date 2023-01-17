const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.tsx'
  ],
  theme: {
    screens: {
      // 'xs': '480px',
      // 'sm': '576px',
      // 'md': '768px',
      // 'lg': '992px',
      // 'xl': '1134px'

      'xs': '380px',
      'sm': '480px',
      'md': '576px',
      'lg': '768px',
      'xl': '992px',
      '2xl': '1110px'
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

    container: {
      center: true,
      padding: {
        DEFAULT: '8px',
        'md': '12px',
      }
    },

    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(({ addComponents, addVariant, addUtilities, theme }) => {
      addComponents({
        // '.btn': {
        //   padding: theme('spacing.4'),
        //   borderRadius: theme('borderRadius.sm')
        // },
        '.container': {
          maxWidth: theme('screens.2xl'),
        },
      });
      addVariant('not-last', '&:not(:last-child)');
      addUtilities({
        '.flex-center': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
        '.absolute-center': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        },
        '.flex-0': {
          flex: '0 0 auto'
        },
        '.scrollbar-mod': {
          '&::-webkit-scrollbar': {
            width: '15px'
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '25px',
            border: '4px solid transparent',
            backgroundClip: 'content-box'
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#ccc',
            borderRadius: '25px',
            border: '4px solid transparent',
            backgroundClip: 'content-box'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#b3b3b3',
            border: '4px solid transparent',
            backgroundClip: 'content-box'
          },
        },
        '.scrollbar-hide': {
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          '&': {
            '-ms-overflow-style': 'none', /* IE and Edge */
            'scrollbar-width': 'none' /* Firefox */
          }
        }
      })
    }),
  ],
}
