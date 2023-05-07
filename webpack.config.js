const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports = (env, argv) => [{
  /** Renderer */
  name: 'renderer',
  target: 'electron-renderer',
  devtool: 'cheap-source-map',
  entry: path.resolve(__dirname, 'src/renderer/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'build/app/renderer'),
    globalObject: 'globalThis',
    filename: '[name].js',
    clean: true
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [{
      test: /\.(js|tsx?)$/,
      include: path.resolve(__dirname, 'src'),
      loader: 'esbuild-loader',
      options: {
        target: 'es2017'
      }
    }, {
      test: /\.scss/,
      include: path.resolve(__dirname, 'src/renderer'),
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            url: false,
            sourceMap: argv.mode === 'development'
          }
        }, {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              sourceMap: argv.mode === 'development',
              includePaths: [
                path.resolve(__dirname, 'src/renderer/scss/utils'),
                path.resolve(__dirname, 'src/renderer/scss/partials')
              ],
              style: argv.mode === 'development' ?
                'expanded' :
                'compressed'
            }
          }
        }
      ]
    }]
  },
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        DOM: JSON.stringify('production')
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/renderer/index.html'),
        to: path.resolve(__dirname, 'build/app/renderer/index.html')
      }, {
        from: path.resolve(__dirname, 'src/renderer/assets'),
        to: path.resolve(__dirname, 'build/app/renderer'),
        toType: 'dir'
      }]
    })
  ]
}];
