import { nativeImage } from 'electron';
import path from 'path';

import { IpcRoute, IpcChannel } from '@doombox/types/ipc';

import Router from '../../lib/ipc/router';
import createIpcSend from '../../lib/ipc/send';
import Window from '../../lib/window/window';

export type AppWindowProps = {
  dir: {
    cache: string
    thumbs: string
  }
};

export default class AppWindow extends Window {
  private _updateToolbar(props: { playing: boolean }) {
    const ipcSend = createIpcSend(this._window.webContents);
    const createIcon = (id: string) =>
      nativeImage.createFromPath(path.resolve(__dirname, `assets/icons/${id}-white.png`));

    this._window.setThumbarButtons([{
      tooltip: 'Previous',
      icon: createIcon('skip_previous'),
      click: () => ipcSend(IpcRoute.Previous)
    }, {
      tooltip: 'Play',
      flags: props.playing ? ['hidden'] : undefined,
      icon: createIcon('play'),
      click: () => ipcSend(IpcRoute.Play)
    }, {
      tooltip: 'Pause',
      flags: !props.playing ? ['hidden'] : undefined,
      icon: createIcon('pause'),
      click: () => ipcSend(IpcRoute.Pause)
    }, {
      tooltip: 'Next',
      icon: createIcon('skip_next'),
      click: () => ipcSend(IpcRoute.Next)
    }, {
      tooltip: 'Shuffle',
      icon: createIcon('shuffle'),
      click: () => ipcSend(IpcRoute.Shuffle)
    }]);
  }

  constructor(props: AppWindowProps) {
    super({
      cache: {
        root: props.dir.cache,
        name: 'app'
      },
      title: 'Doombox',
      file: {
        html: path.resolve(__dirname, 'renderer/app/index.html'),
        preload: path.resolve(__dirname, 'preload/app.js')
      },
      data: JSON.stringify({ dir: { thumbs: props.dir.thumbs } })
    });

    const router = new Router();
    router.receive(IpcChannel.Player, () => ({
      play: () => this._updateToolbar({ playing: true }),
      pause: () => this._updateToolbar({ playing: false })
    }));
  }

  async show() {
    await super.show();
    this._updateToolbar({ playing: false });
  }
}
