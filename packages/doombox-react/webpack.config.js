const path = require('path');

// Plugins
const FsWebpackPlugin = require('fs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outputPath = path.resolve(__dirname, '../../build/client');

module.exports = {
  mode: 'development',
  output: {
    path: outputPath,
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
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: path.resolve(__dirname, 'src'),
      exclude: [/\.(spec\.js)$/, /(_utils)/],
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
      include: path.resolve(__dirname, 'assets'),
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]'
      }
    }]
  },
  plugins: [
    new FsWebpackPlugin([{
      type: 'delete',
      files: '*',
      root: outputPath,
      hooks: ['beforeRun']
    }]),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
