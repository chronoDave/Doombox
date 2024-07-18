import type { SubscriptionController } from '../../../types/ipc';
import type { WebContents } from 'electron';

const send = (sender: WebContents) => <
  T extends keyof SubscriptionController,
  K extends keyof SubscriptionController[T]
>(channel: T, route: K) =>
  (payload: SubscriptionController[T][K]) => sender.send(`${channel}.${route as string}`, payload);

export default send;
