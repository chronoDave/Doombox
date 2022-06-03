const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const alias = {
  '@doombox-utils': path.resolve(__dirname, 'src/utils'),
  '@doombox-config': path.resolve(__dirname, 'src/config'),
  '@doombox-intl': path.resolve(__dirname, 'src/intl/intl')
};

module.exports = () => [{
  name: 'main',
  target: 'electron-main',
  externals: {
    fsevents: 'require("fs-events")',
    sharp: 'commonjs2 sharp'
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias
  },
  entry: path.resolve(__dirname, 'src/main/index.js'),
  module: {
    rules: [{
      test: /\.node$/,
      loader: 'node-loader'
    }, {
      test: /\.(js|jsx|ts|tsx)$/,
      include: path.resolve(__dirname, 'src'),
      exclude: [/\.spec\.js$/],
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }]
  },
  output: {
    path: path.resolve(__dirname, 'build/main'),
    filename: '[name].bundle.js',
    clean: true
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new CopyPlugin({
      patterns: [{
        from: 'src/main/assets',
        to: 'assets'
      }]
    })
  ],
  optimization: {
    // Split otherwise sharp module won't work
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all'
        }
      }
    },
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
    ]
  }
}, {
  name: 'renderer',
  target: 'electron-renderer',
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias
  },
  entry: path.resolve(__dirname, 'src/renderer/index.jsx'),
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build/renderer'),
    clean: true
  },
  optimization: {
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
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
      test: /\.(js|jsx|ts|tsx)$/,
      include: path.resolve(__dirname, 'src'),
      exclude: [/\.spec\.js$/],
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }, {
      test: /\.scss$/,
      include: path.resolve(__dirname, 'src/renderer'),
      use: [
        MiniCssExtractPlugin.loader,
        { loader: 'css-loader', options: { sourceMap: true, url: false } },
        { loader: 'sass-loader', options: { sourceMap: true } }
      ]
    }, {
      test: /\.(png|jpe?g|gif)$/,
      include: path.resolve(__dirname, 'src/renderer/assets/icons'),
      type: 'asset/resource',
      generator: {
        filename: 'assets/icons/[name][ext]'
      }
    }, {
      test: /\.(png|jpe?g|gif)$/,
      include: path.resolve(__dirname, 'src/renderer/assets/images'),
      type: 'asset/resource',
      generator: {
        filename: 'assets/images/[name][ext]'
      }
    }]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [{
        from: 'src/renderer/assets/fonts',
        to: 'assets/fonts'
      }, {
        from: 'src/renderer/assets/images/README.md',
        to: 'assets/images'
      }, {
        from: 'src/renderer/index.html'
      }]
    })
  ]
}];
