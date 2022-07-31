const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => [{
  /** App */
  name: 'app',
  target: 'electron-main',
  entry: {
    app: path.resolve(__dirname, 'src/app/index.ts'),
    preload: path.resolve(__dirname, 'src/app/preload.ts')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    clean: {
      keep: /renderer/
    }
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [{
      test: /\.(jsx?|tsx?)$/,
      include: path.resolve(__dirname, 'src'),
      loader: 'esbuild-loader',
      options: {
        loader: 'tsx',
        target: 'es2017'
      }
    }]
  },
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
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/app/assets'),
        to: path.resolve(__dirname, 'build/assets'),
        toType: 'dir'
      }]
    })
  ]
}, {
  /** Renderer */
  name: 'renderer',
  target: 'electron-renderer',
  devtool: 'inline-cheap-source-map',
  entry: {
    index: path.resolve(__dirname, 'src/renderer/index.tsx'),
    preload: path.resolve(__dirname, 'src/renderer/preload.ts')
  },
  output: {
    path: path.resolve(__dirname, 'build/renderer'),
    filename: '[name].js',
    clean: true
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [{
      test: /\.(jsx?|tsx?)$/,
      include: path.resolve(__dirname, 'src'),
      loader: 'esbuild-loader',
      options: {
        loader: 'tsx',
        target: 'es2017'
      }
    }, {
      test: /\.scss/,
      include: path.resolve(__dirname, 'src/renderer'),
      use: [
        MiniCssExtractPlugin.loader,
        { loader: 'css-loader', options: { url: false } },
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
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
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/renderer/index.html'),
        to: path.resolve(__dirname, 'build/renderer/index.html')
      }]
    })
  ]
}];
