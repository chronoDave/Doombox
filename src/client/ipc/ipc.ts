import { ipcRenderer } from 'electron';
import { IpcAction, IpcChannel, IpcPayload } from '@doombox/ipc';

export const ipcSend = <T>(
  channel: IpcChannel,
  action: IpcAction,
  data?: T
) => ipcRenderer.send(channel, { action, data });

export const ipcInvoke = <T>(
  channel: IpcChannel,
  action: IpcAction,
  data?: T
): Promise<IpcPayload<T>> => ipcRenderer.invoke(channel, { action, data });
