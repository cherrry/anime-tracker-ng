/* eslint-env node */

const _ = require('lodash');

const baseConfig = require('electron-webpack/webpack.main.config');

const loaderToRemove = (loader) => (
  _.includes([
    'babel-loader',
    'eslint-loader',
    'style-loader',
  ], loader)
);

module.exports = (env) => {
  return baseConfig(env).then((config) => {
    config.module.rules = [
      {
        test: /\.js$/,
        use: [
          {loader: 'babel-loader'},
          {loader: 'eslint-loader'},
        ],
        exclude: /node_modules/,
      },
    ].concat(_.filter(config.module.rules, (rule) => {
      return _.findIndex(
        (rule.loader && [rule.loader]) || (_.isArray(rule.use) ? rule.use : [rule.use]),
        (loader) => loaderToRemove(_.isString(loader) ? loader : loader.loader)
      ) === -1;
    }));

    return config;
  });
};
