module.exports = (config, env, helpers) => {
  if (!config) throw new Error(notFoundError("config"));
  if (!env) throw new Error(notFoundError("env"));
  if (!helpers) throw new Error(notFoundError("helpers"));
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
