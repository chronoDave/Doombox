const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  resolve: {
    alias: {
      '@doombox-utils': path.resolve(__dirname, 'src/utils'),
      '@doombox-config': path.resolve(__dirname, 'src/config'),
      '@doombox-intl': path.resolve(__dirname, 'src/intl')
    }
  },
  watchOptions: {
    ignored: [
      'node_modules/**',
      '**/*.test.js'
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
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
  }
};
