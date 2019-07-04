const { app, BrowserWindow } = require('electron');
const path = require('path');

module.exports = {
  createWindow: () => {
    let window = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false
      }
    });

    switch (process.env.NODE_ENV) {
      case 'development':
        window.loadURL('http://localhost:5000');
        break;
      default:
        // window.loadFile(`${__dirname}/../../client/index.html`);
        // window.loadFile(path.resolve(__dirname, 'client/index.html'));
        window.loadFile(path.normalize(`${app.getAppPath()}/../client/index.html`));
        break;
    }

    window.on('closed', () => {
      window = null;
    });
  }
};
