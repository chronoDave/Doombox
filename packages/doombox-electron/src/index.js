const { app } = require('electron');
const path = require('path');
const debounce = require('lodash.debounce');
const {
  TYPES,
  IPC,
  CACHE,
  THEME
} = require('@doombox/utils');

// Core
const { App } = require('./app');
const { Storage } = require('./storage');
const { StorageController } = require('./controllers');

const root = process.env.NODE_ENV === 'development' ?
  path.resolve(__dirname, '../dev') :
  app.getPath('userData');
const assets = process.env.NODE_ENV === 'development' ?
  path.resolve(__dirname, '../../../build') :
  path.resolve(__dirname, '../../app.asar');

const cache = new Storage(root, 'cache', CACHE);
const theme = new Storage(root, 'theme', THEME);

const Doombox = new App(root, assets);

app.on('ready', () => {
  Doombox.createRouter(IPC.CHANNEL.THEME, new StorageController(theme));

  const window = Doombox.createWindow({
    ...cache.get(TYPES.STORAGE.WINDOW),
    darkTheme: theme.get('variant') === 'dark',
    backgroundColor: theme.get('grey')[theme.get('variant')]
  });

  const handleResize = debounce(() => {
    const { width, height } = window.getBounds();
    cache.set({ width, height }, TYPES.STORAGE.WINDOW);
  }, 100);
  const handleMove = debounce(() => {
    const [x, y] = window.getPosition();
    cache.set({ x, y }, TYPES.STORAGE.WINDOW);
  }, 100);

  window.on('resize', handleResize);
  window.on('move', handleMove);
});

app.on('window-all-closed', () => {
  app.removeAllListeners();
  app.quit();
});
