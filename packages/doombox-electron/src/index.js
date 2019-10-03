const { app } = require('electron');
const path = require('path');
const { isDev } = require('@doombox/utils');

// Core
const { createWindow } = require('./lib/window');
const Store = require('./lib/store');

// Routes
const { systemRouter } = require('./router/systemRouter');
const { userRouter } = require('./router/userRouter');
const { libraryRouter } = require('./router/libraryRouter');
const { imageRouter } = require('./router/imageRouter');

// Database
const NeDB = require('./lib/database/nedb');

// Parsers
const ID3Parser = require('./lib/parser/id3Parser');

if (isDev) {
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS
    // eslint-disable-next-line global-require
  } = require('electron-devtools-installer');

  installExtension(REACT_DEVELOPER_TOOLS, true)
    // eslint-disable-next-line no-console
    .then(name => console.log(`Added Extension:  ${name}`))
    // eslint-disable-next-line no-console
    .catch(err => console.log('An error occurred: ', err));
}

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
      forceMetadata: true // Throw error when missing metadata
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

  const db = new NeDB();
  const mp3Parser = new ID3Parser(store.get('config'), db);

  // Routes
  systemRouter({ db, store });
  userRouter({ db, store });
  libraryRouter({ db, store, parser: { id3: mp3Parser } });
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
