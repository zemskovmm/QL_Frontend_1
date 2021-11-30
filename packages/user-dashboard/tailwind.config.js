const { TailwindTheme } = require("../components/src/styles/TailwindTheme");

module.exports = {
  purge: [
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "src/components/**/*.{js,ts,jsx,tsx}",
    "../components/src/**/*.{js,ts,jsx,tsx}",
  ],
  ...TailwindTheme,
  plugins: [],
}
