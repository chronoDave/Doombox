import { IpcChannel, IpcPayload } from '@doombox-types';
import { ipcRenderer } from 'electron';

export default (channel: IpcChannel, payload: IpcPayload) => {
  console.log(channel, payload);

  ipcRenderer.send(channel, payload);
};
