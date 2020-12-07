/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FsWebpackPlugin = require('fs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const outputPath = path.resolve(__dirname, 'build/client');

module.exports = ({ alias, env = {}, argv = {} }) => ({
  name: 'client',
  target: 'electron-renderer',
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias
  },
  entry: path.resolve(__dirname, 'src/client/index.jsx'),
  output: {
    path: outputPath,
    filename: '[name].bundle.js'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: /@license/i
          },
          compress: {
            passes: 2
          }
        },
        extractComments: {
          filename: ({ filename }) => `${filename.split('.').slice(0, -1).join('.')}.license.txt`
        }
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
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, 'src/client')],
      exclude: [/\.(spec\.js)$/],
      loader: 'babel-loader',
      options: {
        plugins: [
          ['emotion', {
            sourceMap: argv.mode !== 'production',
            autoLabel: false,
            cssPropOptimization: false
          }]
        ],
        presets: [
          '@babel/preset-env',
          '@babel/preset-react'
        ]
      }
    }, {
      test: /\.(otf|ttf|png|jpe?g|gif)$/,
      include: [path.resolve(__dirname, 'src/client/assets')],
      loader: 'file-loader',
      options: {
        outputPath: 'assets',
        name: '[folder]/[name].[ext]'
      }
    }]
  },
  plugins: [
    new FsWebpackPlugin([{
      type: 'delete',
      root: outputPath,
      files: null
    }, {
      type: 'copy',
      root: __dirname,
      files: 'src/client/assets/fonts/README.md',
      to: 'build/client/assets/fonts'
    }, {
      type: 'copy',
      root: __dirname,
      files: 'src/client/assets/images/README.md',
      to: 'build/client/assets/images'
    }], { verbose: true }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/client/index.html'),
      filename: 'index.html'
    }),
    env.analyze && new BundleAnalyzerPlugin({ analyzerPort: 3600 })
  ].filter(plugin => plugin)
});
