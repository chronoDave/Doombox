const path = require('path');

// Plugins
const FsWebpackPlugin = require('fs-webpack-plugin');

const alias = {
  '@doombox-config': path.resolve(__dirname, 'src/config'),
  '@doombox-utils': path.resolve(__dirname, 'src/utils.ts')
};

module.exports = [{
  name: 'client',
  target: 'electron-renderer',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias
  },
  entry: path.resolve(__dirname, 'src/client/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'build/client'),
    filename: 'index.js'
  },
  module: {
    rules: [{
      test: /.(ts|tsx)$/,
      include: [
        path.resolve(__dirname, 'src/client'),
        path.resolve(__dirname, 'src/utils.ts')
      ],
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
    extensions: ['.js', '.ts'],
    alias
  },
  entry: path.resolve(__dirname, 'src/electron/index.ts'),
  output: {
    path: path.resolve(__dirname, 'build/electron'),
    filename: 'index.js'
  },
  module: {
    rules: [{
      test: /.(ts|tsx)$/,
      include: [
        path.resolve(__dirname, 'src/electron'),
        path.resolve(__dirname, 'src/utils.ts')
      ],
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
