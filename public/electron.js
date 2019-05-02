const { app, BrowserWindow, dialog } = require('electron');
const path = require("path");
const isDev = require("electron-is-dev");

// Actions
const { initDatabase, populateDatabase } = require('./actions');

// Database
const db = initDatabase();

// Events
const { ipcListener, keyboardListener, removeListeners } = require('./events');

function createWindow() {
  let mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    title: 'Doombox',
    webPreferences: {
      webSecurity: false
    },
    icon: path.join(__dirname, 'assets/icon/favicon_512.png')
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // Add event listeners
  ipcListener(db);
  keyboardListener(mainWindow.webContents);

  // Debug
  mainWindow.webContents.openDevTools();

  // Exports
  exports.selectDirectory = () => dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
    message: 'Select music folder'
  }, filePath => {
    if (filePath) {
      // Doesn't get used ???
      // mainWindow.webContents.send('RECEIVE_ROOT_FOLDER', filePath[0]);
      db.user.update({ _id: 'user' }, { rootPath: filePath[0] }, {});
      populateDatabase(db, filePath[0], mainWindow.webContents);
    }
    return mainWindow.webContents.send('SELECT_PATH_DIALOG');
  });

  exports.selectFile = () => dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    message: 'Select background image',
    filters: [
      { name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif'] }
    ]
  }, filePath => {
    if (filePath) {
      mainWindow.webContents.send('RECEIVE_BACKGROUND_IMAGE', { payload: filePath[0] });
      db.user.update({ _id: 'user' }, { backgroundPath: filePath[0] }, {});
    }
    return mainWindow.webContents.send('SELECT_BACKGROUND_DIALOG');
  });
}

app.on("ready", () => createWindow());
app.on('will-quit', () => removeListeners());
app.on("window-all-closed", () => app.quit());
