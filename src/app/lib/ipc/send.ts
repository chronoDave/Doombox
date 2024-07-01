import type { SubscriptionController } from '../../../types/ipc';
import type { WebContents } from 'electron';

const ipcSend = (sender: WebContents) =>
  <T extends keyof SubscriptionController>(channel: T) =>
    (payload: SubscriptionController[T]) => sender.send(channel, payload);

export default ipcSend;
