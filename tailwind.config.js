/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')
const plugin = require('tailwindcss/plugin')

export default withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'zembl-p': '#19292C',
      'zembl-s': '#F0F0E6',
      'zembl-s1': '#F9F9F2',
      'zembl-action-primary': '#8EFF95'
    },
    extend: {},
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.example': {
          padding: '.5rem 1rem',
        },
      })
    }),
  ],
})
