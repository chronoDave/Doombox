import type { TransferController } from '../../types/ipc';
import type { CacheShape } from '../../types/shapes/cache.shape';
import type Storage from '../lib/storage/storage';

export type CacheControllerProps = {
  storage: Storage<CacheShape>
};

export default (props: CacheControllerProps): TransferController['cache'] =>
  ({
    get: async () => props.storage.get(),
    set: async cache => props.storage.set(cache)
  });
