const path = require('path');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output: {
    path: path.resolve(__dirname, '../../build/client'),
    filename: '[name].bundle.js'
  },
  target: 'electron-renderer',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all'
        }
      }
    }
  },
  devServer: {
    writeToDisk: true
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: path.resolve(__dirname, 'src'),
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ]
        }
      }
    }, {
      test: /\.(png|jpe?g|gif)$/,
      include: path.resolve(__dirname, 'src/assets'),
      loader: 'file-loader'
    }, {
      test: /\.html$/,
      include: path.resolve(__dirname, 'src'),
      loader: 'html-loader'
    }]
  },
  plugins: [
    new CopyWebpackPlugin({ patterns: [{ from: 'src/assets', to: 'assets' }] }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
