/* eslint-env node */

const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlTemplate = require('html-webpack-template');

const ExtractSourceCss = new ExtractTextPlugin('[name]-source.css');
const ExtractVendorCss = new ExtractTextPlugin('[name]-vendor.css');

module.exports = [
  {
    entry: {
      dashboard: './dashboard.js',
      react: ['react', 'react-dom'],
    },
    context: path.resolve(__dirname, 'src'),
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      modules: [
        'node_modules',
        path.resolve(__dirname, 'src'),
      ],
    },
    externals: {
      webtorrent: 'WebTorrent',
    },
    module: {
      rules: [
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
          use: ExtractSourceCss.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {module: true},
              },
            ],
          }),
          include: path.resolve(__dirname, 'src'),
        },
        {
          test: /\.css$/,
          use: ExtractVendorCss.extract({
            fallback: 'style-loader',
            use: [
              {loader: 'css-loader'},
            ],
          }),
          exclude: path.resolve(__dirname, 'src'),
        },
      ],
    },
    plugins: [
      ExtractSourceCss,
      ExtractVendorCss,
      new webpack.optimize.CommonsChunkPlugin('react'),
      new HtmlWebpackPlugin({
        filename: 'dashboard.html',
        inject: false,
        template: htmlTemplate,
        title: 'Anime Tracker',
        appMountId: 'app-root',
        scripts: [
          'webtorrent.min.js',
        ],
      }),
      new CopyWebpackPlugin([
        'manifest.json',
        {
          from: 'webtorrent.min.js',
          context: path.resolve(__dirname, 'node_modules/webtorrent'),
        },
      ], {
        context: path.resolve(__dirname, 'src'),
      }),
    ],
  },
  {
    entry: {
      background: './background.js',
    },
    context: path.resolve(__dirname, 'src'),
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      modules: [
        'node_modules',
        path.resolve(__dirname, 'src'),
      ],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
  },
];
