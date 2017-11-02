/* eslint-env node */

const _ = require('lodash');
const path = require('path');

const baseConfig = require('electron-webpack/webpack.renderer.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlTemplate = require('html-webpack-template');

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
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {module: true},
          },
        ],
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
        ],
        exclude: path.resolve(__dirname, 'src'),
      },
    ].concat(_.filter(config.module.rules, (rule) => {
      return _.findIndex(
        (rule.loader && [rule.loader]) || (_.isArray(rule.use) ? rule.use : [rule.use]),
        (loader) => loaderToRemove(_.isString(loader) ? loader : loader.loader)
      ) === -1;
    }));

    config.plugins = config.plugins.map((plugin) => {
      if (!(plugin instanceof HtmlWebpackPlugin)) {
        return plugin;
      }
      return new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: false,
        template: htmlTemplate,
        title: 'Anime Tracker',
        appMountId: 'app-root',
      });
    });

    return config;
  });
};
