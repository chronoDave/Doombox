import type createIpcRouter from '../ipc/router';

import { BrowserWindow, ipcMain } from 'electron';
import path from 'path';

import { IS_DEV, MIN_HEIGHT, MIN_WIDTH } from '../../../lib/const';
import { IpcChannel } from '../../../types/ipc';

import createController from './window.controller';

export type WindowProps = {
  ipcRouter: ReturnType<typeof createIpcRouter>
  file: string | { url: string, watch: string },
  backgroundColor: string
  preload?: string | { url: string, args: Record<string, unknown> }
  size?: { width: number, height: number },
  position?: { x: number, y: number },
  modal?: boolean
};

export default (props: WindowProps) => {
  const window = new BrowserWindow({
    title: 'Doombox',
    icon: process.platform === 'win32' ?
      path.resolve(__dirname, IS_DEV ? 'assets/dev.ico' : 'assets/app.ico') :
      path.resolve(__dirname, IS_DEV ? 'assets/dev.png' : 'assets/app.png'),
    minWidth: MIN_WIDTH,
    minHeight: MIN_HEIGHT,
    width: props.size?.width,
    height: props.size?.height,
    modal: props.modal,
    x: props.position?.x,
    y: props.position?.y,
    frame: false,
    show: false,
    backgroundColor: props.backgroundColor,
    center: !props.position,
    titleBarStyle: 'hidden',
    webPreferences: {
      enableWebSQL: false,
      additionalArguments: props.preload && typeof props.preload !== 'string' ?
        [JSON.stringify(props.preload.args)] :
        [],
      preload: typeof props.preload === 'string' ?
        props.preload :
        props.preload?.url
    }
  });

  // Window
  window.loadFile(typeof props.file === 'string' ? props.file : props.file.url);
  window.on('ready-to-show', window.show);

  // IPC
  const router = props.ipcRouter(() => createController(window));
  ipcMain.on(IpcChannel.Window, router);

  // Debug
  if (IS_DEV) {
    // eslint-disable-next-line global-require
    require('chokidar')
      .watch((typeof props.file === 'string' ?
        `${path.dirname(props.file)}/**/*` :
        props.file.watch
      ))
      .on('change', () => window.reload());
  }

  return window;
};
