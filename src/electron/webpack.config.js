const path = require('path');

const { merge } = require('webpack-merge');

// Plugins
const FsWebpackPlugin = require('fs-webpack-plugin');

const baseConfig = require('../../webpack.config');

const outputPath = path.resolve(__dirname, '../../build/src');

module.exports = merge(baseConfig, {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: outputPath,
    filename: '[name].bundle.js'
  },
  target: 'electron-main',
  externals: {
    fsevents: 'require("fs-events")'
  },
  plugins: [
    new FsWebpackPlugin([{
      type: 'delete',
      root: outputPath,
      files: null
    }], { verbose: true })
  ]
});
