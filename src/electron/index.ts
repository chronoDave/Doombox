import { app } from 'electron';
import { debounce } from 'throttle-debounce';

import Router from './router';

import createWindow from './window/window';
import windowController from './window/window.controller';

import Cache from './cache/cache.storage';
import CacheController from './cache/cache.controller';

import Theme from './theme/theme.storage';
import ThemeController from './theme/theme.controller';

import ReporterController from './reporter/reporter.controller';

app.on('ready', () => {
  const window = createWindow({
    ...Cache.window,
    darkTheme: Theme.dark,
    backgroundColor: Theme.palette.grey[200]
  })
    .on('will-move', debounce(100, (_, position) => { Cache.position = position; }))
    .on('will-resize', debounce(100, (_, dimensions) => { Cache.dimensions = dimensions; }));

  Router.register('WINDOW', windowController(window));
  Router.register('THEME', ThemeController);
  Router.register('CACHE', CacheController);
  Router.register('REPORTER', ReporterController);
});

app.on('window-all-closed', () => {
  Router.unregisterAll();

  app.quit();
});
