const chokidar = process.env.NODE_ENV === 'development' ?
  require('chokidar') :
  null;
const { app } = require('electron');
const path = require('path');

const {
  TYPES,
  IPC,
  CACHE,
  CONFIG,
  THEME
} = require('@doombox/utils');
const debounce = require('lodash.debounce');

// Core
const { App } = require('./app');
const { StorageController } = require('./controllers');
const { Storage } = require('./storage');

const root = process.env.NODE_ENV === 'development' ?
  path.resolve(__dirname, '../dev') :
  app.getPath('userData');
const assets = process.env.NODE_ENV === 'development' ?
  path.resolve(__dirname, '../../../build') :
  app.getAppPath();

const cache = new Storage(root, 'cache', CACHE);
const config = new Storage(root, 'config', CONFIG);
const theme = new Storage(root, 'theme', THEME);

const Doombox = new App(root, assets);

app.on('ready', () => {
  Doombox.createRouter(IPC.CHANNEL.CACHE, new StorageController(cache));
  Doombox.createRouter(IPC.CHANNEL.CONFIG, new StorageController(config));
  Doombox.createRouter(IPC.CHANNEL.THEME, new StorageController(theme));

  const window = Doombox.createWindow({
    ...cache.get(TYPES.CACHE.WINDOW),
    darkTheme: theme.get('variant') === 'dark',
    backgroundColor: theme.get('grey')[theme.get('variant')]
  });

  if (chokidar) {
    chokidar
      .watch(`${assets}/client/**/*`)
      .on('change', () => window.reload());
  }

  const handleResize = debounce(() => {
    const { width, height } = window.getBounds();
    cache.set({ width, height }, TYPES.CACHE.WINDOW);
  }, 100);
  const handleMove = debounce(() => {
    const [x, y] = window.getPosition();
    cache.set({ x, y }, TYPES.CACHE.WINDOW);
  }, 100);

  window.on('resize', handleResize);
  window.on('move', handleMove);
});

app.on('window-all-closed', () => {
  app.removeAllListeners();
  app.quit();
});
