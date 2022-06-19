import { ipcRenderer } from 'electron';

import { IPC } from '../../types';

export const setAppTitle = title => ipcRenderer.send(
  IPC.CHANNEL.WINDOW,
  { action: IPC.ACTION.WINDOW.SET_TITLE, data: title }
);

export const windowMinimize = () => ipcRenderer.send(
  IPC.CHANNEL.WINDOW,
  { action: IPC.ACTION.WINDOW.MINIMIZE }
);

export const windowMaximize = () => ipcRenderer.send(
  IPC.CHANNEL.WINDOW,
  { action: IPC.ACTION.WINDOW.MAXIMIZE }
);

export const windowClose = () => ipcRenderer.send(
  IPC.CHANNEL.WINDOW,
  { action: IPC.ACTION.WINDOW.CLOSE }
);

export const setThumbar = status => ipcRenderer.send(
  IPC.CHANNEL.WINDOW,
  { action: IPC.ACTION.WINDOW.SET_THUMBAR, data: status }
);
