const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

esbuild.context({
  entryPoints: [
    { in: 'src/app/index.ts', out: 'app' },
    { in: 'src/app/preload.ts', out: 'preload' }
  ],
  external: [
    'electron',
    'sharp',
    'fs-events'
  ],
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  platform: 'node',
  bundle: true,
  outdir: 'build/app',
  outbase: 'src/app',
  plugins: [{
    name: 'copy',
    setup: build => {
      build.onStart(() => {
        const source = path.resolve(__dirname, '../src/app/assets');
        const dest = path.resolve(__dirname, '../build/app/assets');

        fs.rmSync(dest, { recursive: true, force: true });
        fs.cpSync(source, dest, { recursive: true });
      });
    }
  }, {
    name: 'logger',
    setup: build => {
      build.onStart(() => {
        console.log('[esbuild] building...');
        console.time('[esbuild] built in');
      });
      build.onEnd(() => {
        console.timeEnd('[esbuild] built in');
      });
    }
  }]
})
  .then(async context => {
    if (process.argv.slice(2)[0] === '-w') return context.watch();

    await context.rebuild();
    return context.dispose();
  })
  .catch(console.error);
