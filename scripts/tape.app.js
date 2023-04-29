const esbuild = require('esbuild');
const glob = require('fast-glob');
const path = require('path');

esbuild.build({
  entryPoints: [
    ...glob.sync('../src/app/**/*.spec.{ts,tsx}', {
      cwd: __dirname,
      absolute: true
    }),
    ...glob.sync('../src/utils/**/*.spec.{ts,tsx}', {
      cwd: __dirname,
      absolute: true
    })
  ],
  bundle: true,
  external: [
    'tape',
    'electron',
    'sharp',
    'kuromoji'
  ],
  define: {
    'process.env.NODE_ENV': '"development"'
  },
  legalComments: 'none',
  platform: 'node',
  outdir: path.resolve(__dirname, '../build/test'),
  outbase: 'src'
});
