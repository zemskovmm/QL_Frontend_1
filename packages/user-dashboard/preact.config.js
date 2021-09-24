import envVars from 'preact-cli-plugin-env-vars';
import path from 'path';

function updateProcessEnv(config, helpers) {
    const { plugin } = helpers.getPluginsByName(config, 'DefinePlugin')[0];

    Object.assign(
        plugin.definitions,
        ['REACT_APP_API_BASE_URL', 'NEXT_PUBLIC_API_BASE_URL', 'API_BASE_URL'].reduce(
            (env, key) => (key in process.env ? {
                ...env,
                [`process.env.${key}`]: JSON.stringify(process.env[key]),
            } : env),
            {}
        )
    );
}

module.exports = (config, env, helpers) => {

    if (!config) throw new Error(notFoundError("config"));
    if (!env) throw new Error(notFoundError("env"));
    if (!helpers) throw new Error(notFoundError("helpers"));

    config.resolve.alias["api"] = path.resolve(__dirname, 'src/api')
    config.resolve.alias["assets"] = path.resolve(__dirname, 'src/assets')
    config.resolve.alias["components"] = path.resolve(__dirname, 'src/components')
    config.resolve.alias["constants"] = path.resolve(__dirname, 'src/constants')
    config.resolve.alias["layouts"] = path.resolve(__dirname, 'src/layouts')
    config.resolve.alias["routes"] = path.resolve(__dirname, 'src/routes')
    config.resolve.alias["style"] = path.resolve(__dirname, 'src/style')

    envVars(config, env, helpers);

    updateProcessEnv(config, helpers);

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
