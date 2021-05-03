// File craco.config.js

const path = require('path');

const fixModuleTypeScriptPlugin = {
  plugin: {
    overrideWebpackConfig: ({ webpackConfig }) => {
      const oneOfRule = webpackConfig.module.rules.find(
        (rule) => rule.oneOf,
      );
      if (oneOfRule) {
        const tsxRule = oneOfRule.oneOf.find(
          (rule) => rule.test && rule.test.toString().includes('tsx'),
        );

        const newIncludePaths = [
          // relative path to my yarn workspace library
          path.resolve(__dirname, '../components'),
        ];
        if (tsxRule) {
          if (Array.isArray(tsxRule.include)) {
            tsxRule.include = [...tsxRule.include, ...newIncludePaths];
          } else {
            tsxRule.include = [tsxRule.include, ...newIncludePaths];
          }
        }
      }
      return webpackConfig;
    },
  },
}


module.exports = {
  plugins: [fixModuleTypeScriptPlugin],
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
}
