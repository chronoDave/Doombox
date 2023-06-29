const { execFile } = require('child_process');
const chokidar = require('chokidar');
const path = require('path');

let app;
const run = () => {
  console.log('[electron] starting electron');

  return execFile('node', [
    path.resolve(__dirname, '../node_modules/electron/cli.js'),
    'build/app/app.js'
  ], (err, stdout, stderr) => {
    if (stderr) console.error(stderr);
    console.log(stdout);
  });
};

app = run();
chokidar.watch([
  'build/app/app.js',
  'build/app/preload.js'
]).on('change', () => {
  console.log('[electron] detected change, restarting');
  app.kill('SIGINT');
  app = run();
});
