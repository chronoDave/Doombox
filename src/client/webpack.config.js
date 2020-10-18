const path = require('path');

const { merge } = require('webpack-merge');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FsWebpackPlugin = require('fs-webpack-plugin');

const baseConfig = require('../../webpack.config');

const outputPath = path.resolve(__dirname, '../../build/client');

module.exports = merge(baseConfig, {
  entry: path.resolve(__dirname, 'index.jsx'),
  output: {
    path: outputPath,
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [__dirname],
      exclude: [
        /\.(spec\.js)$/,
        path.resolve(__dirname, 'webpack.config.js')
      ],
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react'
        ]
      }
    }, {
      test: /\.(ttf|png|jpe?g|gif)$/,
      include: [path.resolve(__dirname, 'assets')],
      loader: 'file-loader',
      options: {
        outputPath: 'assets',
        name: '[folder]/[name].[ext]'
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  target: 'electron-renderer',
  plugins: [
    new FsWebpackPlugin([{
      type: 'delete',
      root: outputPath,
      files: null
    }, {
      type: 'copy',
      root: __dirname,
      files: 'assets/fonts/README.md',
      to: '../../build/client/assets/fonts'
    }], { verbose: true }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      filename: 'index.html'
    })
  ]
});
