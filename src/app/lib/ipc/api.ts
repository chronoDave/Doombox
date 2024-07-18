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

export const subscribe = <
  T extends keyof SubscriptionController,
  K extends Extract<keyof SubscriptionController[T], string>
>(channel: T, route: K) =>
  (subscriber: (payload: SubscriptionController[T][K]) => void): () => void => {
    const listener = (...args: any[]) => subscriber(args[1]);

    ipcRenderer.on(`${channel}.${route}`, listener);
    return () => ipcRenderer.off(`${channel}.${route}`, listener);
  };
