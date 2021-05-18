import path from 'path';

import { app, BrowserWindow } from 'electron';

const assets = process.env.NODE_ENV === 'development' ?
  path.resolve(__dirname, '../../build') :
  app.getAppPath();

app.on('ready', () => {
  const window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  window.loadFile(path.resolve(assets, 'client/index.html'));

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require
    require('chokidar')
      .watch(`${assets}/client/**/*`)
      .on('change', () => window.reload());
  }
});

app.on('window-all-closed', () => {
  app.quit();
});
