const { TailwindTheme } = require("../components/src/styles/TailwindTheme");

module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    '../components/src/**/*.{js,ts,jsx,tsx}'
  ],
  ...TailwindTheme,
  plugins: [
    /*        require('tailwind-bootstrap-grid')({
                containerMaxWidths: { sm: '540px', md: '720px', lg: '960px', xl: '1140px' },
            }),*/
  ],
};
