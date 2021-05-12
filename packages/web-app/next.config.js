const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  '@project/components',
]);
const withImages = require('next-images')({
  fileExtensions: ["jpg", "jpeg", "png", "gif"],
  webpack(config) {
    return config
  }
});



module.exports = withPlugins([
  withTM,
  withImages
]);
