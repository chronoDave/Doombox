const {
  BrowserWindow,
  globalShortcut
} = require('electron');
const path = require('path');

const createWindow = ({ width, height }) => {
  const minWidth = 640;
  const minHeight = 480;

  const window = new BrowserWindow({
    // Metadata
    title: 'Doombox',
    // General
    width: width < minWidth ? minWidth : width,
    height: height < minHeight ? minHeight : height,
    minWidth,
    minHeight,
    frame: false,
    // Web
    webPreferences: {
      // Security
      // These don't pose a thread in production, as local file is read
      nodeIntegration: true,
      webSecurity: false
    }
  });

  if (process.env.NODE_ENV === 'development') {
    window.loadURL('http://localhost:5000');
  } else {
    window.loadFile(path.resolve(__dirname, '../../client/index.html'));
  }

  return window;
};

const createKeyboardListener = (keybinds = {}, callback) => (
  Object.entries(keybinds).forEach(([action, keybind]) => {
    if (!keybind) return;
    globalShortcut.register(keybind, () => callback({ action, keybind }));
  })
);

module.exports = {
  createWindow,
  createKeyboardListener
};
