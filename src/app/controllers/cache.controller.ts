import type Storage from '../../lib/storage/storage';
import type { TransferController } from '../../types/ipc';
import type { CacheShape } from '../../types/shapes/cache.shape';

export type CacheControllerProps = {
  storage: Storage<CacheShape>
};

export default (props: CacheControllerProps): TransferController['cache'] =>
  ({
    get: async () => props.storage.state,
    set: async cache => {
      props.storage.set(() => cache);
      return props.storage.state;
    }
  });
