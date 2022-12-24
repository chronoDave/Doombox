import type Storage from './storage';
import type Logger from './logger';
import type { AppShape } from '../../types/shapes/app.shape';

import path from 'path';
import { BrowserWindow, ipcMain } from 'electron';

import { IpcChannel } from '../../types/ipc';
import { debounce } from '../../utils/function';

import createWindowController from './controllers/window.controller';
import { createIpcRouter } from './utils/ipc';
import { isDev } from './utils/dev';

export type WindowProps = {
  storage: Storage<AppShape>,
  logger: Logger
};

export default (props: WindowProps) => {
  const window = new BrowserWindow({
    ...props.storage.get('window'),
    title: 'Doombox',
    icon: process.platform === 'win32' ?
      path.resolve(__dirname, isDev ? 'assets/dev.ico' : 'assets/app.ico') :
      path.resolve(__dirname, isDev ? 'assets/dev.png' : 'assets/app.png'),
    minWidth: 320,
    minHeight: 240,
    frame: process.platform === 'darwin',
    titleBarStyle: 'hidden',
    webPreferences: {
      enableWebSQL: false,
      preload: path.resolve(__dirname, 'preload.js')
    }
  });

  const router = createIpcRouter(createWindowController({
    window
  }))(props.logger);
  const handleResize = debounce(() => props.storage.set('window', window.getBounds()), 100);
  const handleMove = debounce(() => {
    const [x, y] = window.getPosition();
    props.storage.set('window', { x, y });
  }, 100);

  window.once('ready-to-show', window.show);
  window.on('resize', handleResize);
  window.on('move', handleMove);

  ipcMain.on(IpcChannel.Window, router);

  window.loadFile('renderer/index.html');
  if (isDev) {
    // eslint-disable-next-line global-require
    require('chokidar')
      .watch(`${__dirname}/renderer/**/*`)
      .on('change', () => window.reload());
  }

  return window;
};
