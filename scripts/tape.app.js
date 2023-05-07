const esbuild = require('esbuild');
const glob = require('fast-glob');
const fs = require('fs');
const path = require('path');

const outdir = path.resolve(__dirname, '../build/test');
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
    'process.env.NODE_ENV': '"development"',
    'process.env.DOM': '"development"'
  },
  legalComments: 'none',
  platform: 'node',
  outdir,
  outbase: 'src',
  plugins: [{
    name: 'clean',
    setup: build => {
      build.onStart(() => {
        fs.rmSync(path.resolve(outdir, 'app'), { recursive: true, force: true });
        fs.rmSync(path.resolve(outdir, 'utils'), { recursive: true, force: true });
      });
    }
  }]
});
