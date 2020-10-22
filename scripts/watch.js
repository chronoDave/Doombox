#!/usr/bin/env node

const { execSync } = require('child_process');
const chokidar = require('chokidar');

const run = () => {
  const commands = process.argv
    .join(' ')
    .split('-e')
    .slice(1);

  for (let i = 0; i < commands.length; i += 1) {
    execSync(commands[i]);
  }
};

chokidar
  .watch('src/electron', { ignoreInitial: true })
  .on('ready', run)
  .on('all', event => (event === 'add' || event === 'change') && run());
