import path from 'path';
import { BrowserWindow } from 'electron';

export default <T extends Record<string, any>>(assets: string, cache: T) => {
  const window = new BrowserWindow({
    ...cache,
    title: 'Doombox',
    icon: process.platform === 'win32' ?
      path.resolve(assets, 'icons/app.ico') :
      path.resolve(assets, 'icons/app.png'),
    minWidth: 320,
    minHeight: 240,
    frame: process.platform === 'darwin',
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

  return window;
};
