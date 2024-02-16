import type { BrowserWindow } from 'electron';

import { nativeImage } from 'electron';
import path from 'path';

import { IpcRoute } from '../../types/ipc';
import createIpcSend from '../utils/ipcSend';

export default (window: BrowserWindow) => (props: { playing: boolean }) => {
  const ipcSend = createIpcSend(window.webContents);
  const createIcon = (id: string) =>
    nativeImage.createFromPath(path.resolve(__dirname, `assets/icons/${id}-white.png`));

  window.setThumbarButtons([{
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
};
