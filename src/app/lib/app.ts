import type { IpcRouter } from '../../types/ipc';
import type { AppShape } from '../../types/shapes/app.shape';
import type { ThemeShape } from '../../types/shapes/theme.shape';
import type Logger from './logger';
import type Storage from './storage';

import { app, ipcMain, nativeTheme } from 'electron';

import { IpcChannel } from '../../types/ipc';

import createWindow from './window';

export type AppProps = {
  logger: Logger
  storage: {
    app: Storage<AppShape>
    theme: Storage<ThemeShape>
  },
  router: {
    app: IpcRouter
    library: IpcRouter,
    theme: IpcRouter,
    user: IpcRouter
  }
};

export default async (props: AppProps) => {
  nativeTheme.themeSource = props.storage.theme.get('theme');

  await app.whenReady();

  ipcMain.handle(IpcChannel.App, props.router.app);
  ipcMain.handle(IpcChannel.User, props.router.user);
  ipcMain.handle(IpcChannel.Theme, props.router.theme);
  ipcMain.handle(IpcChannel.Library, (...args) => props.router.library(...args));

  createWindow({ storage: props.storage.app, logger: props.logger });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('render-process-gone', (e, w, d) => {
    props.logger.error(new Error(JSON.stringify(d)));
    app.quit();
  });

  app.on('child-process-gone', (e, d) => {
    props.logger.error(new Error(JSON.stringify(d)));
    app.quit();
  });
};
