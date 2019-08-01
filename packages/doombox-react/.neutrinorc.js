const { isDev } = require('@doombox/utils');
const path = require('path');

module.exports = {
  options: {
    root: isDev() ? './' : __dirname
  },
  use: ['@neutrinojs/react'],
  env: {
    NODE_ENV: {
      development: {
        use: [
          (neutrino) => neutrino.config.devtool('source-map') // Generate source-map
        ]
      },
      production: {
        use: [
          '@neutrinojs/react', {
            targets: {
              browsers: [
                'last 1 Chrome versions'
              ]
            }
          },
          (neutrino) => neutrino.config
            .devtool(false)
            .node
              .set('__dirname', false) // Set global __dirname variable to node's default, instead of Webpack's context
        ]
      }
    }
  }
}