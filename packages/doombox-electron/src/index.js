const { app } = require('electron');
const path = require('path');

// Core
const { createWindow } = require('./lib/window');
const Store = require('./lib/store');

// Routes
const { systemRouter } = require('./router/systemRouter');
const { userRouter } = require('./router/userRouter');
const libraryRouter = require('./router/libraryRouter');
const { imageRouter } = require('./router/imageRouter');

// Controllers
const LibraryController = require('./controller/libraryController');

// Database
const NeDB = require('./lib/database/nedb');

const store = new Store({
  configName: 'user-preferences',
  defaults: {
    window: {
      width: 800,
      height: 600
    },
    config: {
      imagePath: path.resolve(`${app.getPath('userData')}/images`),
      batchSize: 50,
      parseImage: true, // Create album images
    },
    user: {
      remote: null,
      _id: null,
      settings: {}
    }
  }
});

app.on('ready', () => {
  const { width, height } = store.get('window');
  const config = store.get('config');

  const db = new NeDB();

  // Routes
  systemRouter({ db, store });
  userRouter({ db, store });
  libraryRouter(new LibraryController(config, db));
  imageRouter({ db });

  // Main
  const mainWindow = createWindow({ width, height });

  mainWindow.on('resize', () => {
    store.set('window', { ...mainWindow.getBounds() });
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
