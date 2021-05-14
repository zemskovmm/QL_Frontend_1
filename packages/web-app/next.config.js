const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["@project/components"]);
const withImages = require("next-images");

module.exports = withPlugins([withTM, withImages], {
  serverRuntimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL
  },
});
