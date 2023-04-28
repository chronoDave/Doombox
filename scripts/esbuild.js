const esbuild = require('esbuild');

console.log(process.argv.slice(2)[0]);

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
  platform: 'node',
  bundle: true,
  outdir: 'build',
  outbase: 'src/app',
  plugins: [{
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
