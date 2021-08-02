import { BrowserWindow } from 'electron';
import { IpcController } from '@doombox/ipc';

export default (window: BrowserWindow): IpcController<'WINDOW'> => ({
  CLOSE: () => Promise.resolve(window.close()),
  MINIMIZE: () => Promise.resolve(window.minimize()),
  MAXIMIZE: () => Promise.resolve(
    window.isMaximized() ?
      window.unmaximize() :
      window.maximize()
  )
});
