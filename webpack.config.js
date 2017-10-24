const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlTemplate = require('html-webpack-template');

module.exports = {
  entry: './dashboard.js',
  context: path.resolve(__dirname, 'src'),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'dashboard.html',
      inject: false,
      template: htmlTemplate,
      title: 'Anime Tracker',
      appMountId: 'app-root',
    }),
    new CopyWebpackPlugin([
      'manifest.json',
    ], {
      context: path.resolve(__dirname, 'src'),
    }),
  ],
};
