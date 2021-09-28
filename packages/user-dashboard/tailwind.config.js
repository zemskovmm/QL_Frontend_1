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
      spacing: {
        card: "856px",
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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
