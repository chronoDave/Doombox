const chokidar = require('chokidar');
const path = require('path');
const childProcess = require('child_process');
const electron = require('electron');

let child = null;
const spawn = () => {
  if (child) child.kill();
  child = childProcess.spawn(electron, ['build/electron/index.js'], {
    env: {
      ...process.env,
      NODE_ENV: 'development'
    }
  });
};

chokidar
  .watch(path.resolve(__dirname, '../build/electron'))
  .on('ready', () => {
    console.info('[watch] Watching electron');
    spawn();
  })
  .on('change', () => {
    console.info('[watch] Change detected, restarting...');
    spawn();
  });
