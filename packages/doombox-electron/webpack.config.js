const path = require('path');

// Plugins
const FsWebpackPlugin = require('fs-webpack-plugin');

const outputPath = path.resolve(__dirname, '../../build/src');

module.exports = env => ({
  mode: 'development',
  output: {
    path: outputPath,
    filename: '[name].bundle.js'
  },
  target: 'electron-main',
  plugins: [
    new FsWebpackPlugin([{
      type: 'delete',
      files: '*',
      root: outputPath,
      hooks: (!env || !env.analyze) ? ['beforeRun'] : []
    }])
  ]
});
