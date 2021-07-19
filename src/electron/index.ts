import fs from 'fs';
import { app } from 'electron';
import { debounce } from 'throttle-debounce';

import cache from './storage/cache.storage';
import theme from './storage/theme.storage';

import Router from './router';
import { DIR_LOG } from './const';
import createWindow from './window';
import createWindowController from './controller/window.controller';

app.on('ready', () => {
  fs.mkdirSync(DIR_LOG, { recursive: true });

  const window = createWindow(cache.get('window'), {
    darkTheme: theme.get('dark'),
    backgroundColor: theme.get('palette').grey[200]
  })
    .on('will-move', debounce(100, (_, { x, y }) => cache.set('window', { x, y })))
    .on('will-resize', debounce(100, (_, { width, height }) => cache.set('window', { width, height })))

  Router.register('WINDOW', createWindowController(window));
});

app.on('window-all-closed', () => {
  Router.unregisterAll();

  app.quit();
});
