/* eslint-env node */

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlTemplate = require('html-webpack-template');

module.exports = {
  module: {
    rules: [
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: false,
      template: htmlTemplate,
      title: 'Anime Tracker',
      appMountId: 'app-root',
    }),
  ],
};
