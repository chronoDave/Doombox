import type { IpcApi, IpcChannel } from '../../types/ipc';
import type { Component } from 'forgo';

const useIpc = <T extends keyof IpcApi[IpcChannel.Listener]>(
  channel: T,
  cb: (payload: Parameters<Parameters<IpcApi[IpcChannel.Listener][T]>[0]>[0]) => void
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
