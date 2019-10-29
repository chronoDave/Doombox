const { app } = require('electron');
const path = require('path');

// Lib
const { createWindow } = require('./lib/window');
const Store = require('./lib/store');
const Logger = require('./lib/logger');

// Routes
const userRouter = require('./router/userRouter');
const libraryRouter = require('./router/libraryRouter');
const imageRouter = require('./router/imageRouter');
const systemRouter = require('./router/systemRouter');
const playlistRouter = require('./router/playlistRouter');

// Controllers
const LibraryController = require('./controller/libraryController');
const UserController = require('./controller/userController');
const SystemController = require('./controller/systemController');
const ImageController = require('./controller/imageController');
const PlaylistController = require('./controller/playlistController');

// Database
const NeDB = require('./lib/database/nedb');

const logger = new Logger();
const db = new NeDB();
const store = new Store({
  fileName: 'user-preferences',
  defaults: {
    window: {
      width: 800,
      height: 600
    },
    config: {
      imagePath: path.resolve(app.getPath('userData'), 'images'),
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

  // Routes
  userRouter(new UserController(store, db, logger));
  libraryRouter(new LibraryController(config, db, logger));
  imageRouter(new ImageController(db, logger));
  systemRouter(new SystemController(store, logger));
  playlistRouter(new PlaylistController(db, logger));

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
