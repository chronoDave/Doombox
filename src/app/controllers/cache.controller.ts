import type { IpcChannel, IpcInvokeController } from '../../types/ipc';
import type { CacheShape } from '../../types/shapes/cache.shape';
import type Storage from '../lib/storage/storage';

export type CacheControllerProps = {
  storage: Storage<CacheShape>
};

export default (props: CacheControllerProps) =>
  (): IpcInvokeController[IpcChannel.Cache] => ({
    get: async () => props.storage.get(),
    set: async payload => props.storage.set(payload)
  });
