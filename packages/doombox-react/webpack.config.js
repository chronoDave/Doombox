const path = require('path');

// Plugins
const FsWebpackPlugin = require('fs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => ({
  mode: 'development',
  cache: false,
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
      include: path.resolve(__dirname, 'assets'),
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]'
      }
    }]
  },
  plugins: (() => {
    const plugins = [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        filename: 'index.html'
      })
    ];

    if (env.production) {
      plugins.push(new FsWebpackPlugin([
        { type: 'delete', files: '../../build/client/**/*' },
        { type: 'copy', files: 'assets/**/*', to: '../../build/client/assets' }
      ]));
    }

    return plugins;
  })(),
  resolve: {
    extensions: ['.js', '.jsx']
  }
});
