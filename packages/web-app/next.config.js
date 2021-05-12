const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  '@project/components',
]);
const withImages = require('next-images');



module.exports = withPlugins([
  withTM,
  withImages
]);
