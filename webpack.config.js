const path = require('path');

// Plugins
const TerserPlugin = require('terser-webpack-plugin');
const FsWebpackPlugin = require('fs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Shared
const optimization = {
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        format: {
          comments: /@license/i
        }
      },
      extractComments: false
    })
  ],
  splitChunks: {
    cacheGroups: {
      vendors: {
        name: 'vendors',
        test: /[\\/]node_modules[\\/]/,
        chunks: 'all'
      }
    }
  }
};

// Client
const client = {
  name: 'client',
  target: 'electron-renderer',
  entry: path.resolve(__dirname, 'src/client/index.tsx'),
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  output: {
    path: path.resolve(__dirname, 'build/client'),
    filename: '[name].js'
  },
  optimization,
  module: {
    rules: [{
      test: /\.ts|tsx$/,
      loader: 'ts-loader',
      include: path.resolve(__dirname, 'src/client')
    }]
  },
  plugins: [
    new FsWebpackPlugin([{
      type: 'delete',
      files: 'build/client'
    }], { verbose: true }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/client/index.html'),
      filename: 'index.html'
    })
  ]
};

// Electron
const electron = {
  name: 'electron',
  target: 'electron-main',
  entry: path.resolve(__dirname, 'src/electron/index.ts'),
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  output: {
    path: path.resolve(__dirname, 'build/src'),
    filename: '[name].js'
  },
  optimization,
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'ts-loader',
      include: path.resolve(__dirname, 'src/electron')
    }]
  },
  plugins: [
    new FsWebpackPlugin([{
      type: 'delete',
      files: 'build/src'
    }], { verbose: true }),
  ]
};

module.exports = [
  client,
  electron
];
