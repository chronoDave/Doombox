import type { WindowShape } from '@doombox/types/shapes/window.shape';

import { BrowserWindow, nativeTheme } from 'electron';
import produce from 'immer';
import path from 'path';

import {
  IS_DEV,
  MIN_HEIGHT,
  MIN_WIDTH,
  THEME_DARK,
  THEME_LIGHT
} from '@doombox/lib/const';
import windowShape from '@doombox/types/shapes/window.shape';

import debounce from '../../../lib/function/debounce';
import Storage from '../storage/storage';

export type WindowProps = {
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

  readonly window: BrowserWindow;

  constructor(props: WindowProps) {
    this._cache = new Storage({
      name: props.cache.name,
      shape: windowShape,
      root: props.cache.root
    });

    this.window = new BrowserWindow({
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
      const { width, height } = this.window.getBounds();
      this._cache.set(produce<WindowShape>(draft => {
        draft.width = width;
        draft.height = height;
      })(this._cache.get()));
    }, 100);

    this._onmove = debounce(() => {
      const [x, y] = this.window.getPosition();
      this._cache.set(produce<WindowShape>(draft => {
        draft.x = x;
        draft.y = y;
      })(this._cache.get()));
    }, 100);

    this.window.on('ready-to-show', () => {
      this._ready = true;
    });

    this.window.on('resize', () => this._onresize());
    this.window.on('move', () => this._onmove());

    if (IS_DEV) {
      // eslint-disable-next-line global-require
      require('chokidar')
        .watch([
          `${path.dirname(props.file.html)}/**/*`,
          props.file.preload
        ])
        .on('change', () => this.window.reload());
    }

    this.window.loadFile(props.file.html);
  }

  async show() {
    if (!this._ready) {
      return new Promise<void>(resolve => {
        this.window.once('ready-to-show', () => {
          this.window.show();
          resolve();
        });
      });
    }

    return this.window.show();
  }
}
