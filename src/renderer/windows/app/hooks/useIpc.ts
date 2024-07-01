import type { SubscriptionController } from '@doombox/types/ipc';
import type { Component } from 'forgo';

const useIpc = <T extends keyof SubscriptionController>(
  channel: T,
  subscriber: (payload: SubscriptionController[T]) => void
) => (component: Component) => {
  let cleanup: () => void;

  component.mount(() => {
    cleanup = window.ipc.on[channel](payload => {
      subscriber(payload as any);
      component.update();
    });
  });

  component.unmount(() => {
    cleanup?.();
  });
};

export default useIpc;
