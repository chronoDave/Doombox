const { BrowserWindow } = require('electron');
const path = require('path');

const createWindow = (options = {}) => {
  let window = new BrowserWindow({
    // Metadata
    title: 'Doombox',
    // General
    width: options.width || 600,
    height: options.height || 480,
    minWidth: 600,
    minHeight: 480,
    frame: false,
    // Web
    webPreferences: {
      // Security
      nodeIntegration: true, // Doesn't pose a thread in production, as local file is read
      webSecurity: false
    }
  });

  if (process.env.NODE_ENV === 'development') {
    window.loadURL('http://localhost:5000');
  } else {
    window.loadFile(path.resolve(__dirname, '../../client/index.html'));
  }

  window.on('closed', () => {
    window = null;
  });

  return window;
};

module.exports = {
  createWindow
};
