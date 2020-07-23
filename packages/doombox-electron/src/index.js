const { app } = require('electron');
const path = require('path');
const debounce = require('lodash.debounce');
const {
  IPC,
  CACHE,
  CONFIG,
  STORAGE,
  THEME
} = require('@doombox/utils');

// Lib
const {
  Storage,
  StorageController
} = require('./lib');

// Utils
const {
  createWindow,
  createRouter
} = require('./utils/electron');

// Init
const rootPath = process.env.NODE_ENV === 'development' ?
  path.resolve(__dirname, 'dev') :
  app.getPath('userData');

const cache = new Storage(rootPath, 'cache', CACHE);
const config = new Storage(rootPath, 'config', CONFIG);
const theme = new Storage(rootPath, 'theme', THEME);

// Theme
const { variant, grey } = theme.get();
const backgroundColor = grey[variant];

app.on('ready', () => {
  // Routers
  createRouter(IPC.CHANNEL.THEME, new StorageController(theme));

  // Window
  const windowMain = createWindow({
    ...cache.get(STORAGE.WINDOW),
    darkTheme: variant === 'dark',
    backgroundColor
  });

  const handleResize = debounce(() => {
    const { width, height } = windowMain.getBounds();
    cache.update({ width, height }, STORAGE.WINDOW);
  }, 100);
  const handleMove = debounce(() => {
    const [x, y] = windowMain.getPosition();
    cache.update({ x, y }, STORAGE.WINDOW);
  }, 100);

  windowMain.on('resize', handleResize);
  windowMain.on('move', handleMove);
});

// Prevent multi-instance
if (!app.requestSingleInstanceLock()) {
  const { forceQuit } = config.get(STORAGE.GENERAL);

  if (!process.platform !== 'darwin' || forceQuit) {
    app.quit();
  }
}

app.on('window-all-closed', () => {
  app.quit();
});
