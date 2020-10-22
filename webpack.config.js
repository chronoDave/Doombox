const path = require('path');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FsWebpackPlugin = require('fs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const outputPathClient = path.resolve(__dirname, 'build/client');
const outputPathElectron = path.resolve(__dirname, 'build/src');
const alias = {
  '@doombox-utils': path.resolve(__dirname, 'src/utils'),
  '@doombox-config': path.resolve(__dirname, 'src/config'),
  '@doombox-intl': path.resolve(__dirname, 'src/intl')
};
const optimization = {
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
};

module.exports = [{
  name: 'client',
  target: 'electron-renderer',
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias
  },
  watchOptions: {
    ignored: [
      'build/**',
      'dist/**',
      'docs/**',
      'node_modules/**',
      'scripts/**',
      'test/**',
      'userData/**',
      '**/*.spec.js'
    ]
  },
  entry: path.resolve(__dirname, 'src/client/index.jsx'),
  output: {
    path: outputPathClient,
    filename: '[name].bundle.js'
  },
  optimization,
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, 'src/client')],
      exclude: [/\.(spec\.js)$/],
      loader: 'babel-loader',
      options: {
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
      root: outputPathClient,
      files: null
    }, {
      type: 'copy',
      root: __dirname,
      files: 'src/client/assets/fonts/README.md',
      to: 'build/client/assets/fonts'
    }], { verbose: true }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/client/index.html'),
      filename: 'index.html'
    })
  ]
}, {
  name: 'electron',
  target: 'electron-main',
  externals: {
    fsevents: 'require("fs-events")'
  },
  mode: 'development',
  resolve: {
    alias
  },
  entry: path.resolve(__dirname, 'src/electron/index.js'),
  output: {
    path: outputPathElectron,
    filename: '[name].bundle.js'
  },
  optimization,
  plugins: [
    new FsWebpackPlugin([{
      type: 'delete',
      root: outputPathElectron,
      files: null
    }], { verbose: true })
  ]
}];
