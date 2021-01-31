const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {

    extend: {
      height: {
        content: 'min-content',
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
