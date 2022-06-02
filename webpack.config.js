const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const alias = {
  '@doombox-utils': path.resolve(__dirname, 'src/utils'),
  '@doombox-config': path.resolve(__dirname, 'src/config'),
  '@doombox-intl': path.resolve(__dirname, 'src/intl')
};

const outputElectron = path.resolve(__dirname, 'build/src');
const outputReact = path.resolve(__dirname, 'build/client');

module.exports = () => [{
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
  module: {
    rules: [{
      test: /\.node$/,
      loader: 'node-loader'
    }, {
      test: /\.(js|jsx|ts|tsx)$/,
      include: path.resolve(__dirname, 'src/electron'),
      exclude: [/\.spec\.js$/],
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }]
  },
  output: {
    path: outputElectron,
    filename: '[name].bundle.js',
    clean: true
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
    plugins: [new ForkTsCheckerWebpackPlugin()],
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all'
        }
      }
    }
  }
}, {
  name: 'client',
  target: 'electron-renderer',
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias
  },
  entry: path.resolve(__dirname, 'src/client/index.jsx'),
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].[contenthash].js',
    path: outputReact,
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
      include: path.resolve(__dirname, 'src/client'),
      exclude: [/\.spec\.js$/],
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }, {
      test: /\.scss$/,
      include: path.resolve(__dirname, 'src/client'),
      use: [
        MiniCssExtractPlugin.loader,
        { loader: 'css-loader', options: { sourceMap: true, url: false } },
        { loader: 'sass-loader', options: { sourceMap: true } }
      ]
    }, {
      test: /\.(png|jpe?g|gif)$/,
      include: path.resolve(__dirname, 'src/client/assets/icons'),
      type: 'asset/resource',
      generator: {
        filename: 'assets/icons/[name][ext]'
      }
    }, {
      test: /\.(png|jpe?g|gif)$/,
      include: path.resolve(__dirname, 'src/client/assets/images'),
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
        from: 'src/client/assets/fonts',
        to: 'assets/fonts'
      }, {
        from: 'src/client/assets/images/README.md',
        to: 'assets/images'
      }, {
        from: 'src/client/index.html'
      }]
    })
  ]
}];
