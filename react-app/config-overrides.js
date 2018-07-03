const webpack = require('webpack');

module.exports = function override(config, env) {
  config.module.rules = Array.prototype.concat(config.module.rules, [
    {
      test: /\.(tsx|ts)?$/,
      loader: 'prettier-loader',
      exclude: /node_modules/,
    },
  ]);
  config.plugins = Array.prototype.concat(config.plugins, [
    new webpack.ProvidePlugin({
      Parse: 'parse'
    })
  ])
  return config;
}