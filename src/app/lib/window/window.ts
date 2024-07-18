import type { Event, SubscriptionController } from '@doombox/types/ipc';
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
import debounce from '@doombox/lib/function/debounce';
import Storage from '@doombox/lib/storage/storage';
import windowShape from '@doombox/types/shapes/window.shape';

export type WindowProps = {
  id: string
  title: string
  root: string
};

export default class Window {
  private readonly _cache: Storage<WindowShape>;
  private readonly _file: string;

  protected readonly _window: BrowserWindow;

  constructor(props: WindowProps) {
    const preload = path.resolve(__dirname, `preload/${props.id}.js`);

    this._file = path.resolve(__dirname, `renderer/${props.id}/index.html`);
    this._cache = new Storage({
      file: { name: props.id, root: props.root },
      shape: windowShape
    });

    this._window = new BrowserWindow({
      ...this._cache.state,
      title: props.title,
      icon: process.platform === 'win32' ?
        path.resolve(__dirname, IS_DEV ? 'assets/dev.ico' : 'assets/app.ico') :
        path.resolve(__dirname, IS_DEV ? 'assets/dev.png' : 'assets/app.png'),
      minWidth: MIN_WIDTH,
      minHeight: MIN_HEIGHT,
      frame: false,
      show: false,
      darkTheme: nativeTheme.shouldUseDarkColors,
      backgroundColor: nativeTheme.shouldUseDarkColors ?
        THEME_DARK.background :
        THEME_LIGHT.background,
      titleBarStyle: 'hidden',
      webPreferences: {
        enableWebSQL: false,
        preload
      }
    });

    const handleResize = debounce(() => {
      const { width, height } = this._window.getBounds();
      this._cache.set(produce(draft => {
        draft.width = width;
        draft.height = height;
      }));
    }, 100);

    const handleMove = debounce(() => {
      const [x, y] = this._window.getPosition();
      this._cache.set(produce(draft => {
        draft.x = x;
        draft.y = y;
      }));
    }, 100);

    this._window.on('resize', () => handleResize());
    this._window.on('move', () => handleMove());

    if (IS_DEV) {
      // eslint-disable-next-line global-require
      require('chokidar')
        .watch([
          `${path.dirname(this._file)}/**/*`,
          path.join(path.dirname(this._file), '../core.css'),
          preload
        ])
        .on('change', () => this._window.reload());
    }
  }

  send<T extends keyof SubscriptionController>(channel: T) {
    return <K extends keyof SubscriptionController[T]>(route: Extract<K, string>) =>
      (payload: SubscriptionController[T][K]) => {
        const event: Event = { route, payload };
        this._window.webContents.send(channel, event);
      };
  }

  async show() {
    await this._window.loadFile(this._file);
    this._window.show();
  }
}
