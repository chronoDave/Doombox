/* eslint-disable import/no-extraneous-dependencies */
const { buildSync } = require('esbuild');
const path = require('path');
const fs = require('fs');
const match = require('picomatch');
const walk = require('@chronocide/fs-walk').default;

const [folder, glob] = process.argv.slice(2);
const isMatch = match(glob ?? '**/*.spec.ts');
const files = walk(path.resolve(process.cwd(), folder))
  .filter(isMatch);

fs.rmSync(path.resolve(__dirname, 'build/test'), { force: true, recursive: true });

buildSync({
  entryPoints: files,
  bundle: true,
  external: ['tape'],
  legalComments: 'none',
  platform: 'node',
  outdir: path.resolve('build/test', folder.split('/')[1])
});
