const path = require('path');

// Plugins
const FsWebpackPlugin = require('fs-webpack-plugin');

module.exports = [{
  name: 'client',
  target: 'electron-renderer',
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  entry: path.resolve(__dirname, 'src/client/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'build/client'),
    filename: 'index.js'
  },
  module: {
    rules: [{
      test: /.(ts|tsx)$/,
      include: path.resolve(__dirname, 'src/client'),
      loader: 'ts-loader'
    }]
  },
  plugins: [
    new FsWebpackPlugin([{
      type: 'delete',
      files: 'build/client'
    }], { verbose: true })
  ]
}, {
  name: 'electron',
  target: 'electron-main',
  resolve: {
    extensions: ['.js', '.ts']
  },
  entry: path.resolve(__dirname, 'src/electron/index.ts'),
  output: {
    path: path.resolve(__dirname, 'build/electron'),
    filename: 'index.js'
  },
  module: {
    rules: [{
      test: /.(ts|tsx)$/,
      include: path.resolve(__dirname, 'src/electron'),
      loader: 'ts-loader'
    }]
  },
  plugins: [
    new FsWebpackPlugin([{
      type: 'delete',
      files: 'build/electron'
    }, {
      type: 'copy',
      files: [{
        from: 'src/client/index.html',
        to: 'build/client'
      }]
    }], { verbose: true })
  ]
}];
