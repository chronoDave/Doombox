/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

// Plugins
const FsWebpackPlugin = require('fs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const outputPath = path.resolve(__dirname, 'build/src');

module.exports = ({ alias, env = {} }) => ({
  name: 'electron',
  target: 'electron-main',
  externals: {
    fsevents: 'require("fs-events")',
    sharp: 'commonjs2 sharp'
  },
  mode: 'development',
  resolve: {
    alias
  },
  entry: path.resolve(__dirname, 'src/electron/index.js'),
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
      test: /\.node$/,
      loader: 'node-loader'
    }]
  },
  plugins: [
    new FsWebpackPlugin([{
      type: 'delete',
      files: 'build/src'
    }], { verbose: true }),
    env.analyze && new BundleAnalyzerPlugin({ analyzerPort: 7777 })
  ].filter(plugin => plugin)
});
