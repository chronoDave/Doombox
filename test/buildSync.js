const { buildSync } = require('esbuild');
const path = require('path');
const fs = require('fs');
const walk = require('@chronocide/fs-walk');

const outdir = path.resolve(__dirname, 'build');
const entryPoints = [
  'utils'
]
  .map(dir => walk(path.resolve(__dirname, dir)))
  .flat();

fs.rmSync(outdir, { force: true, recursive: true });
buildSync({
  entryPoints,
  bundle: true,
  external: ['tape'],
  legalComments: 'none',
  platform: 'node',
  outdir
});
