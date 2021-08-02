import { ipcRenderer } from 'electron';
import { IpcAction, IpcChannel, IpcPayload } from '@doombox/ipc';

export const ipcSend = <T extends IpcChannel>(
  channel: T,
  action: IpcAction<T>,
  data?: unknown
) => ipcRenderer.send(channel, { action, data });

export const ipcInvoke = <T extends IpcChannel, P>(
  channel: T,
  action: IpcAction<T>,
  data?: unknown
): Promise<IpcPayload<T, P>> => ipcRenderer.invoke(channel, { action, data });
