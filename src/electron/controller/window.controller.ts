import { BrowserWindow } from 'electron';

import { IpcController } from './controller';

export default (window: BrowserWindow): IpcController => ({
  MINIMIZE: () => {
    window.minimize();

    return Promise.resolve();
  },
  MAXIMIZE: () => {
    if (window.isMaximized()) {
      window.unmaximize();
    } else {
      window.maximize();
    }

    return Promise.resolve();
  },
  CLOSE: () => {
    window.close();

    return Promise.resolve();
  }
});
