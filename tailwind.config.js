const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {

    extend: {
      height: {
        content: 'min-content',
      },
      maxHeight: {
        '0': '0',
        '1/4': '25vh',
        '1/2': '50vh',
        '3/4': '75vh',
        '9/10': '90vh',
        'full': '100vh',
        'inherit': 'inherit',
       },
      colors: {
        primary: 'var(--color-primary)',
        primarydarker: 'var(--color-primary-darker)',
        primarymuchlighter: 'var(--color-primary-much-lighter)',
        textfirst: 'var(--color-text-first)',
        textsecond: 'var(--color-text-second)',
        textdisabled: 'var(--color-text-disabled)',
        blackhover: 'var(--color-black-hover)',
        whitehover: 'var(--color-white-hover)',
        danger: 'var(--color-danger)',
      },
      fontFamily: {
        sourcepro: ['Source Pro Sans', 'sans'],
        merriweather: ['Merriweather', 'serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
