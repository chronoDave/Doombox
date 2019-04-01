const { app, BrowserWindow, dialog } = require('electron');
const path = require("path");
const isDev = require("electron-is-dev");
const debug = require('electron-debug');

// Actions
const { initDatabase, populateDatabase } = require('./actions');

// Database
const db = initDatabase();

// Debug
debug();

// Events
const { ipcListener } = require('./events/IpcEvents');

function createWindow() {
  let mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      webSecurity: false
    }
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

  // Debug
  mainWindow.webContents.openDevTools();

  // Exports
  exports.selectDirectory = () => dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
    message: 'Select music folder'
  }, filePath => {
    if (filePath) {
      mainWindow.webContents.send('RECEIVE_ROOT_FOLDER', filePath[0]);
      db.user.update({ _id: 'user' }, { rootFolder: filePath[0] }, {});
      populateDatabase(db, filePath[0]);
      // Callback
      mainWindow.webContents.send('SET_BUSY', { payload: true });
      return mainWindow.webContents.send('SELECT_PATH_DIALOG');
    }
    return mainWindow.webContents.send('SELECT_PATH_DIALOG');
  });
}

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  app.quit();
});
