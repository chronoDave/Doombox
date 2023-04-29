import type { IpcPayloadReceive, IpcChannelReceive } from '../../../types/ipc';
import type { WebContents } from 'electron';

import { IpcChannel } from '../../../types/ipc';

const ipcSend = (sender: WebContents) =>
  <T extends keyof IpcPayloadReceive>(channel: T) =>
    (payload: IpcPayloadReceive[T]) => {
      const receiveChannel: IpcChannelReceive<T> = `${IpcChannel.Receive}.${channel}`;
      sender.send(receiveChannel, payload);
    };

export default ipcSend;
