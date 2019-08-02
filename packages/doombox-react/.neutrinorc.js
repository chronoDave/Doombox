const { isDev } = require('@doombox/utils');
const path = require('path');

module.exports = {
  options: {
    root: isDev() ? './' : __dirname
  },
  use: [
    [
      '@neutrinojs/react', {
        targets: 'electron >6'
      }
    ],
    [
      '@neutrinojs/mocha', {
        reporter: 'list'
      }
    ]
  ],
  env: {
    NODE_ENV: {
      production: {
        use: [
          (neutrino) => neutrino.config
            .devtool(false)
            .node
              .set('__dirname', false) // Set global __dirname variable to node's default, instead of Webpack's context
        ]
      }
    },
    NJS_ENV: {
      debug: {
        use: [
          (neutrino) => neutrino.config
            .devtool('source-map')
        ]
      }
    }
  }
}
