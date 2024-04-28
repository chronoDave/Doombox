const fs = require('fs');
const path = require('path');

const copy = require('../plugins/copy');
const log = require('../plugins/log');
const sass = require('../plugins/sass');

const common = require('./common');

const windows = fs.readdirSync(path.resolve(__dirname, '../../../src/renderer/windows'));

module.exports = options => ({
  ...common(options),
  entryPoints: [
    { in: 'src/renderer/scss/index.scss', out: 'core' },
    ...windows.map(window => `src/renderer/windows/${window}/index.tsx`)
  ],
  outdir: 'build/app/renderer',
  outbase: 'src/renderer/windows',
  metafile: true,
  plugins: [
    log('renderer'),
    sass({
      style: options.dev ?
        'expanded' :
        'compressed',
      depedencies: [
        'src/renderer/scss/core'
      ],
      ignore: /\.ttf$/
    }),
    copy([{
      in: 'src/renderer/assets/fonts',
      out: 'build/app/renderer/fonts'
    }, {
      in: 'src/renderer/assets/icons',
      out: 'build/app/renderer/icons'
    }, ...windows.map(window => ({
      in: `src/renderer/windows/${window}/index.html`,
      out: `build/app/renderer/${window}/index.html`
    }))])
  ]
});
