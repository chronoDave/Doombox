import type Logger from './logger/logger';
import type Storage from './storage/storage';
import type { AppShape } from '../../types/shapes/app.shape';

import { BrowserWindow, ipcMain } from 'electron';
import produce from 'immer';
import path from 'path';

import { IpcChannel } from '../../types/ipc';
import { IS_DEV, MIN_WIDTH, MIN_HEIGHT } from '../../utils/const';
import createWindowController from '../controllers/window.controller';
import createIpcRouter from '../utils/createIpcRouter';
import debounce from '../utils/debounce';

export type WindowProps = {
  storage: Storage<AppShape>,
  thumbs: string,
  logger: Logger
};

export default (props: WindowProps) => {
  const window = new BrowserWindow({
    ...props.storage.get().window,
    title: 'Doombox',
    icon: process.platform === 'win32' ?
      path.resolve(__dirname, IS_DEV ? 'assets/dev.ico' : 'assets/app.ico') :
      path.resolve(__dirname, IS_DEV ? 'assets/dev.png' : 'assets/app.png'),
    minWidth: MIN_WIDTH,
    minHeight: MIN_HEIGHT,
    frame: process.platform === 'darwin',
    titleBarStyle: 'hidden',
    webPreferences: {
      enableWebSQL: false,
      additionalArguments: [JSON.stringify({ thumbs: props.thumbs })],
      preload: path.resolve(__dirname, 'preload.js')
    }
  });

  const router = createIpcRouter(props.logger)(() => createWindowController({
    window
  }));
  const handleResize = debounce(() => {
    const { width, height } = window.getBounds();
    props.storage.set(produce(draft => {
      draft.window.width = width;
      draft.window.height = height;
    })(props.storage.get()));
  }, 100);
  const handleMove = debounce(() => {
    const [x, y] = window.getPosition();
    props.storage.set(produce(draft => {
      draft.window.x = x;
      draft.window.y = y;
    })(props.storage.get()));
  }, 100);

  window.once('ready-to-show', window.show);
  window.on('resize', handleResize);
  window.on('move', handleMove);

  ipcMain.on(IpcChannel.Window, router);

  window.loadFile('renderer/index.html');
  if (IS_DEV) {
    // eslint-disable-next-line global-require
    require('chokidar')
      .watch(`${__dirname}/renderer/**/*`)
      .on('change', () => window.reload());
  }

  return window;
};
