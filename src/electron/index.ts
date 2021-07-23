import { app } from 'electron';
import { debounce } from 'throttle-debounce';

import cache from './storage/cache.storage';
import theme from './storage/theme.storage';

import Router from './router';
import createWindow from './window';

import windowController from './controller/window.controller';
import storageController from './controller/storage.controller';

app.on('ready', () => {
  const window = createWindow(cache.window, {
    darkTheme: theme.dark,
    backgroundColor: theme.palette.grey[200]
  })
    .on('will-move', debounce(100, (_, position) => { cache.position = position; }))
    .on('will-resize', debounce(100, (_, dimensions) => { cache.dimensions = dimensions; }));

  Router.register('WINDOW', windowController(window));
  Router.register('THEME', storageController(theme));
});

app.on('window-all-closed', () => {
  Router.unregisterAll();

  app.quit();
});
