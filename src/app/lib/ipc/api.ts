import type {
  ReceiveController,
  TransferController,
  Event,
  SubscriptionController
} from '@doombox/types/ipc';

import { ipcRenderer } from 'electron';

export const send = <T extends keyof ReceiveController>(
  channel: T,
  route: Extract<keyof ReceiveController[T], string>
) => (payload: unknown) => {
  const event: Event = { route, payload };
  ipcRenderer.send(channel, event);
};

export const transfer = <T extends keyof TransferController>(
  channel: T,
  route: Extract<keyof TransferController[T], string>
) => (payload: unknown) => {
  const event: Event = { route, payload };

  return ipcRenderer.invoke(channel, event);
};

export const subscribe = <T extends keyof SubscriptionController>(channel: T) =>
  (subscriber: (payload: SubscriptionController[T]) => void): () => void => {
    const listener = (...args: any[]) => {
      console.log(channel);
      subscriber(args[1]);
    }


    ipcRenderer.on(channel, listener);
    return () => ipcRenderer.off(channel, listener);
  };
