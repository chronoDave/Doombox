import type { IpcChannel, IpcInvokeController } from '../../types/ipc';
import type { RendererShape } from '../../types/shapes/renderer.shape';
import type Storage from '../lib/storage/storage';

export type RendererControllerProps = {
  storage: Storage<RendererShape>
};

export default (props: RendererControllerProps) =>
  (): IpcInvokeController[IpcChannel.Renderer] => ({
    get: async () => props.storage.get(),
    set: async payload => props.storage.set(payload)
  });
