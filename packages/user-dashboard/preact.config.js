import envVars from 'preact-cli-plugin-env-vars';

function updateProcessEnv(config,helpers){
  const { plugin } = helpers.getPluginsByName(config, 'DefinePlugin')[0];
 
  Object.assign(
    plugin.definitions,
    ['REACT_APP_API_BASE_URL','NEXT_PUBLIC_API_BASE_URL','API_BASE_URL'].reduce(
      (env, key) => (key in process.env ? {
        ...env,
        [`process.env.${key}`]: JSON.stringify(process.env[key]),
      }:env),
      {}
    )
  );
}

module.exports = (config, env, helpers) => {

  if (!config) throw new Error(notFoundError("config"));
  if (!env) throw new Error(notFoundError("env"));
  if (!helpers) throw new Error(notFoundError("helpers"));

  envVars(config, env, helpers);

  updateProcessEnv(config,helpers);

  const purgecss = require("@fullhuman/postcss-purgecss")({
    // Specify the paths to all of the template files in your project
    content: [
      "public/index.html",
      "src/**/*.{js,ts,jsx,tsx}",
      "src/components/**/*.{js,ts,jsx,tsx}",
      "../components/src/**/*.{js,ts,jsx,tsx}",
    ],
  });

  const postCssLoaders = helpers.getLoadersByName(config, "postcss-loader");
  postCssLoaders.forEach(({ loader }) => {
    const plugins = loader.options.postcssOptions.plugins;

    // Add tailwind css at the top.
    plugins.unshift(require("tailwindcss"));
    if (env.production) plugins.push(purgecss);
  });
  return config;
};
