const react = require('@neutrinojs/react');
const path = require('path');
const { app } = require('electron');

module.exports = {
  options: {
    root: path.resolve(
      __dirname,
      process.env.NODE_ENV === 'production' ? '../../' : './'
    ),
    source: path.resolve(__dirname, 'src'),
    output: path.resolve(__dirname, '../doombox-electron/client')
  },
  use: [
    react({
      publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
      html: {
        title: 'Doombox'
      },
      targets: {
        browsers: ['last 1 Electron versions']
      }
    }),
    neutrino => {
      if (process.env.NODE_ENV === 'production') {
        neutrino.config.node
          .set('__dirname', false)
      }
    }
  ]
};
