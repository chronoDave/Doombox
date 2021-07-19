import { ipcRenderer } from 'electron';
import { IpcChannel, IpcPayload } from '@doombox/ipc';

export const ipcSend = (
  channel: IpcChannel,
  payload: IpcPayload
) => ipcRenderer.send(channel, payload);

export const ipcInvoke = <T>(
  channel: IpcChannel,
  payload: IpcPayload
): Promise<IpcPayload<T>> => ipcRenderer.invoke(channel, payload);
