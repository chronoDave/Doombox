import type { IpcReceiveController, IpcPayloadReceive } from '../../../types/ipc';
import type { Component } from 'forgo';

const useIpc = <T extends keyof IpcReceiveController>(
  channel: T,
  cb: (payload: IpcPayloadReceive[T]) => void
) => (component: Component) => {
  let cleanup: () => void;

  component.mount(() => {
    cleanup = window.ipc.on[channel](payload => {
      cb(payload);
      component.update();
    });
  });

  component.unmount(() => {
    cleanup?.();
  });
};

export default useIpc;
