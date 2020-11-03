const path = require('path');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FsWebpackPlugin = require('fs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

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

const createClientConfig = ({ env = {}, argv }) => {
  const outputPath = path.resolve(__dirname, 'build/client');
  const plugins = [
    new FsWebpackPlugin([{
      type: 'delete',
      root: outputPath,
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
    }),
  ];

  if (env.analyze) plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 3600 }));

  return ({
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
    optimization,
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
    plugins
  });
};

const createElectronConfig = ({ env = {} }) => {
  const outputPath = path.resolve(__dirname, 'build/src');
  const plugins = [
    new FsWebpackPlugin([{
      type: 'delete',
      root: outputPath,
      files: null
    }], { verbose: true })
  ];

  if (env.analyze) plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 7777 }));

  return ({
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
      path: outputPath,
      filename: '[name].bundle.js'
    },
    optimization,
    plugins
  });
};

module.exports = (env, argv) => [
  createClientConfig({ env, argv }),
  createElectronConfig(({ env, argv }))
];
