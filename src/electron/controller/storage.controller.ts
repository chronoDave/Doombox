import { IpcController } from '@doombox/ipc';

import Storage from '../storage/storage';

export default <S extends Storage<unknown>>(storage: S): IpcController => ({
  GET: () => Promise.resolve(storage.get()),
  SET: x => Promise.resolve(storage.set(x))
});
