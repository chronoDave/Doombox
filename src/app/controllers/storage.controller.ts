import type Storage from '../../lib/storage/storage';
import type { StorageTransferController } from '../../types/ipc';
import type { Shape } from '../../types/primitives';

export default <T extends Shape>(storage: Storage<T>): StorageTransferController<T> => ({
  get: async () => storage.state,
  set: async state => {
    storage.set(() => state);
    return storage.state;
  }
});
