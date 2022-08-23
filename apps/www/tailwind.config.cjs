const typography = require('@tailwindcss/typography')

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0057A3',
          50: '#5CB3FF',
          100: '#47A9FF',
          200: '#1E96FF',
          300: '#0083F5',
          400: '#006DCC',
          500: '#0057A3',
          600: '#00396B',
          700: '#001B33',
          800: '#000000',
          900: '#000000',
        },
      },
      fontSize: {
        '2xs': '.5rem',
        sm: '.82rem',
      },
    },
  },
  plugins: [typography],
}

module.exports = config
