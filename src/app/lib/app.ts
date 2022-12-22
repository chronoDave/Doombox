import type Storage from './storage';
import type LeafDB from 'leaf-db';
import type { Image, Song } from '../../types/library';
import type { AppShape } from '../../types/shapes/app.shape';
import type Logger from './logger';
import type { ThemeShape } from '../../types/shapes/theme.shape';

import { app, ipcMain, nativeTheme } from 'electron';

import { IpcChannel } from '../../types/ipc';

import createWindow from './window';
import createLibraryController from './ipc/library/library.controller';
import createThemeController from './ipc/theme/theme.controller';
import createLibraryRouter from './ipc/library/library.router';
import createThemeRouter from './ipc/theme/theme.router';

export type AppProps = {
  logger: Logger
  db: {
    songs: LeafDB<Song>
    images: LeafDB<Image>
  }
  storage: {
    app: Storage<AppShape>
    theme: Storage<ThemeShape>
  }
};

export default async (props: AppProps) => {
  const libraryRouter = createLibraryRouter(createLibraryController({
    db: props.db
  }))(props.logger);
  const themeRouter = createThemeRouter(createThemeController({
    storage: props.storage.theme
  }))(props.logger);

  nativeTheme.themeSource = props.storage.theme.get('theme');

  await app.whenReady();

  ipcMain.handle(IpcChannel.Theme, themeRouter);
  ipcMain.handle(IpcChannel.Library, libraryRouter);

  createWindow({ storage: props.storage.app, logger: props.logger });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
};
