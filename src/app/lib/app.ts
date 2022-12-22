import type Storage from './storage';
import type LeafDB from 'leaf-db';
import type { Image, Song } from '../../types/library';
import type { AppShape } from '../../types/shapes/app.shape';
import type Logger from './logger';
import type { ThemeShape } from '../../types/shapes/theme.shape';
import type { IpcRouter } from '../../types/ipc';

import { app, ipcMain, nativeTheme } from 'electron';

import { IpcChannel } from '../../types/ipc';

import createWindow from './window';

export type AppProps = {
  logger: Logger
  db: {
    songs: LeafDB<Song>
    images: LeafDB<Image>
  }
  storage: {
    app: Storage<AppShape>
    theme: Storage<ThemeShape>
  },
  router: {
    library: IpcRouter,
    theme: IpcRouter
  }
};

export default async (props: AppProps) => {
  nativeTheme.themeSource = props.storage.theme.get('theme');

  await app.whenReady();

  ipcMain.handle(IpcChannel.Theme, props.router.theme);
  ipcMain.handle(IpcChannel.Library, props.router.library);

  createWindow({ storage: props.storage.app, logger: props.logger });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
};
