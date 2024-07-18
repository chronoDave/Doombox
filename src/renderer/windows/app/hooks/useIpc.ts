import type { SubscriptionController } from '@doombox/types/ipc';
import type { Component } from 'forgo';

const useIpc = <
  T extends keyof SubscriptionController,
  K extends Extract<keyof SubscriptionController[T], string>
>(
  channel: T,
  route: K,
  subscriber: (payload: SubscriptionController[T][K]) => void
) => (component: Component) => {
  let cleanup: () => void;

  component.mount(() => {
    cleanup = window.ipc.on[channel][route](payload => {
      subscriber(payload as SubscriptionController[T][K]);
      component.update();
    });
  });

  component.unmount(() => {
    cleanup?.();
  });
};

export default useIpc;
