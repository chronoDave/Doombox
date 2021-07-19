const path = require('path');

// Plugins
const FsWebpackPlugin = require('fs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const alias = {
  '@doombox': path.resolve(__dirname, 'src/lib'),
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
        path.resolve(__dirname, 'src/lib'),
      ],
      loader: 'ts-loader'
    }, {
      test: /\.scss$/,
      include: path.resolve(__dirname, 'src/client'),
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ]
    }, {
      test: /\.otf$/,
      include: path.resolve(__dirname, 'build/fonts'),
      type: 'asset/inline'
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    new FsWebpackPlugin([{
      type: 'delete',
      files: 'build/client'
    }], { verbose: true })
  ]
}, {
  name: 'electron',
  target: 'electron-main',
  externals: {
    fsevents: 'require("fs-events")'
  },
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
        path.resolve(__dirname, 'src/lib'),
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
      }],
      hooks: ['beforeRun', 'watchRun']
    }], { verbose: true })
  ]
}];
