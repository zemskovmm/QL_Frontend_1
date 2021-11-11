const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["@project/components"]);
const withImages = require("next-images");

module.exports = withPlugins([withTM, withImages], {
  
  serverRuntimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL,
  },

  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    DASHBOARD_PUBLIC_BASE_URL: process.env.DASHBOARD_PUBLIC_BASE_URL,
  },
});
