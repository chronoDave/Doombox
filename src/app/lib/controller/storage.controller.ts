import type { Shape } from '../../../types/primitives';
import type { IpcPayloadGet, IpcPayloadSet } from '../../../types/ipc';
import type Storage from '../storage/storage';

import { isIpcEventGet, isIpcEventSet } from '../../../utils/validation';

import Controller from './controller';

export type StorageControllerProps<T extends Shape> = {
  storage: Storage<T>
};

export default class StorageController<T extends Shape> extends Controller {
  private readonly _storage: Storage<T>;

  private _get(payload: IpcPayloadGet<T>) {
    return this._storage.get(payload.key);
  }

  private _set(payload: IpcPayloadSet<T>) {
    return this._storage.set(payload.key, payload.value);
  }

  constructor(props: StorageControllerProps<T>) {
    super();

    this._storage = props.storage;
  }

  route(event: unknown) {
    return new Promise((resolve, reject) => {
      if (isIpcEventGet<T>(event)) return resolve(this._get(event.payload));
      if (isIpcEventSet<T>(event)) {
        this._set(event.payload);
        resolve(this._get(event.payload));
      }
      return reject(new Error(`Invalid action: ${JSON.stringify(event)}`));
    });
  }
}
