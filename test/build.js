const { buildSync } = require('esbuild');
const path = require('path');
const fs = require('fs');
const walk = require('@chronocide/fs-walk');

const outdir = path.resolve(__dirname, 'build');

fs.rmSync(outdir, { force: true, recursive: true });
buildSync({
  entryPoints: walk(path.resolve(__dirname, 'src')),
  bundle: true,
  external: ['tape'],
  legalComments: 'none',
  platform: 'node',
  outdir,
  outbase: 'test/src'
});
