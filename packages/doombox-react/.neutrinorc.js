const path = require('path');

module.exports = {
  options: {
    root: path.resolve( __dirname, '../../'),
    source: path.resolve(__dirname, 'src'),
    output: path.resolve(__dirname, '../doombox-electron/client')
  },
  use: [
    ['@neutrinojs/react', {
      targets: 'electron >6'
    }]
  ]
}