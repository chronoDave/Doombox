import type { Shape } from '../../../types/primitives';
import type Storage from '../storage';
import type { ControllerProps } from './controller';

import { isIpcPayloadGet, isIpcPayloadSet } from '../../../utils/validation';

import Controller from './controller';

export type StorageControllerProps<T extends Shape> = ControllerProps & {
  storage: Storage<T>
};

export default class StorageController<T extends Shape> extends Controller {
  protected readonly _storage: Storage<T>;

  get(payload: unknown) {
    return new Promise((resolve, reject) => {
      if (!isIpcPayloadGet<T>(payload)) return reject(this._log('Invalid get payload', payload));
      return resolve(this._storage.get(payload.key));
    });
  }

  set(payload: unknown) {
    return new Promise((resolve, reject) => {
      if (!isIpcPayloadSet<T>(payload)) return reject(this._log('Invalid set payload', payload));
      return resolve(this._storage.set(payload.key, payload.value));
    });
  }

  constructor(props: StorageControllerProps<T>) {
    super(props);

    this._storage = props.storage;
  }
}
