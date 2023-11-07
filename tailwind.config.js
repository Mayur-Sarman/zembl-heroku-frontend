/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')
const plugin = require('tailwindcss/plugin')

export default withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/tailwind-datepicker-react/dist/**/*.js'],
  theme: {
    colors: {
      'zembl-p': '#19292C',
      'zembl-s': '#F0F0E6',
      'zembl-s1': '#F9F9F2',
      'zembl-action-primary': '#8EFF95',
    },
    extend: {},
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.zembl-btn': {
          color: theme('zembl-p', '#19292C'),
          'box-shadow': 'none',
          'background-color': theme('zembl-action-primary', '#8EFF95'),
          '&:active': {
            'background-color': '#7FE586',
          },
        },
      })
    }),
  ],
})
