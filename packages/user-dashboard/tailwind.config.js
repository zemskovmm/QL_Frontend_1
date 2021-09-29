module.exports = {
  purge: [
    "public/index.html",
    "src/**/*.{js,ts,jsx,tsx}",
    "src/components/**/*.{js,ts,jsx,tsx}",
    "../components/src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'tablet': '640px',// => @media (min-width: 640px) { ... }
        'laptop': '1024px',// => @media (min-width: 1024px) { ... }
        'desktop': '1280px',// => @media (min-width: 1280px) { ... }
      },
      maxWidth: {
        'laptop': "1024px",
        'card-large': "856px",
        'card-medium': "432px",
        'card-small': "280px",
      },
      colors: {
        'caption': '#A8B5CC',
        'primary': '#373737',
        'error': '#e3342f',

        'button': '#ff6768',
        'button-text': '#fff',
        'button-secondary': '#ECEFF5',
        'button-secondary-text': '#222A37',
      },
      fontSize: {
        'title-large': ['2.25rem', '2.5rem'],
        'title-medium': ['1.875rem', '2.25rem'],
        'title-small': ['1.5rem', '2rem'],
        'large': ['1.125rem', '1.75rem'],
        'medium': ['1rem', '1.5rem'],
        'small': ['0.875rem', '1.25rem'],
        'caption': ['0.75rem', '1rem'],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
