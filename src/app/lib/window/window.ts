import type Logger from '../logger/logger';
import type { IpcSendController } from '@doombox/types/ipc';
import type { WindowShape } from '@doombox/types/shapes/window.shape';

import { BrowserWindow, ipcMain, nativeTheme } from 'electron';
import produce from 'immer';
import path from 'path';

import {
  IS_DEV,
  MIN_HEIGHT,
  MIN_WIDTH,
  THEME_DARK,
  THEME_LIGHT
} from '@doombox/lib/const';
import { IpcChannel } from '@doombox/types/ipc';
import windowShape from '@doombox/types/shapes/window.shape';

import debounce from '../function/debounce';
import ipcRouter from '../ipc/router';
import Storage from '../storage/storage';

export type WindowProps = {
  logger: Logger
  cache: {
    root: string
    name: string
  }
  title: string
  file: {
    html: string
    preload: string
  }
  data?: string
};

export default class Window {
  private readonly _cache: Storage<WindowShape>;
  private readonly _onresize: () => void;
  private readonly _onmove: () => void;
  private _ready?: boolean;

  protected readonly _window: BrowserWindow;

  constructor(props: WindowProps) {
    this._cache = new Storage({
      name: props.cache.name,
      shape: windowShape,
      root: props.cache.root
    });

    this._window = new BrowserWindow({
      title: props.title,
      icon: process.platform === 'win32' ?
        path.resolve(__dirname, IS_DEV ? 'assets/dev.ico' : 'assets/app.ico') :
        path.resolve(__dirname, IS_DEV ? 'assets/dev.png' : 'assets/app.png'),
      minWidth: MIN_WIDTH,
      minHeight: MIN_HEIGHT,
      width: this._cache.get().width,
      height: this._cache.get().height,
      x: this._cache.get().x,
      y: this._cache.get().y,
      frame: false,
      show: false,
      darkTheme: nativeTheme.shouldUseDarkColors,
      backgroundColor: nativeTheme.shouldUseDarkColors ?
        THEME_DARK.background :
        THEME_LIGHT.background,
      titleBarStyle: 'hidden',
      webPreferences: {
        enableWebSQL: false,
        preload: props.file.preload,
        additionalArguments: [props.data ?? '']
      }
    });

    this._onresize = debounce(() => {
      const { width, height } = this._window.getBounds();
      this._cache.set(produce<WindowShape>(draft => {
        draft.width = width;
        draft.height = height;
      })(this._cache.get()));
    }, 100);

    this._onmove = debounce(() => {
      const [x, y] = this._window.getPosition();
      this._cache.set(produce<WindowShape>(draft => {
        draft.x = x;
        draft.y = y;
      })(this._cache.get()));
    }, 100);

    this._window.on('ready-to-show', () => {
      this._ready = true;
    });

    this._window.on('resize', () => this._onresize());
    this._window.on('move', () => this._onmove());
    this._window.on('closed', () => {

    });

    ipcMain.on(
      IpcChannel.Window,
      (event, ...args) => {
        if (event.sender.id !== this._window.id) return;

        ipcRouter(props.logger)<IpcSendController[IpcChannel.Window]>(() => ({
          minimize: () => this._window.minimize(),
          maximize: () => this._window.isMaximized() ?
            this._window.unmaximize() :
            this._window.maximize(),
          close: () => this._window.close()
        }))(event, ...args);
      }
    );

    if (IS_DEV) {
      // eslint-disable-next-line global-require
      require('chokidar')
        .watch([
          `${path.dirname(props.file.html)}/**/*`,
          props.file.preload
        ])
        .on('change', () => this._window.reload());
    }

    this._window.loadFile(props.file.html);
  }

  async show() {
    if (!this._ready) {
      return new Promise<void>(resolve => {
        this._window.once('ready-to-show', () => {
          this._window.show();
          resolve();
        });
      });
    }

    return this._window.show();
  }
}
