const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const alias = {
  '@doombox-utils': path.resolve(__dirname, 'src/utils'),
  '@doombox-config': path.resolve(__dirname, 'src/config'),
  '@doombox-intl': path.resolve(__dirname, 'src/intl')
};

const outputElectron = path.resolve(__dirname, 'build/src');
const outputReact = path.resolve(__dirname, 'build/client');

module.exports = (env, argv) => [{
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
  }
}, {
  name: 'client',
  target: 'electron-renderer',
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias
  },
  entry: [
    env.devtools && 'react-devtools',
    path.resolve(__dirname, 'src/client/index.jsx'),
  ].filter(entry => entry),
  output: {
    path: outputReact,
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
      exclude: [/\.spec\.js$/],
      loader: 'babel-loader',
      options: {
        plugins: [
          ['emotion', {
            sourceMap: argv.mode !== 'production',
            autoLabel: 'never',
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
    new CopyPlugin({
      patterns: [{
        from: 'src/client/assets/fonts/README.md',
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
