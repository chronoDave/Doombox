import type { ThemeShape } from '../../../types/shapes/theme.shape';

import { nativeTheme } from 'electron';

import { isIpcPayloadSet } from '../../../utils/validation';

import StorageController from './storage.controller';

export default class ThemeController extends StorageController<ThemeShape> {
  set(payload: unknown) {
    return new Promise((resolve, reject) => {
      if (!isIpcPayloadSet<ThemeShape>(payload)) return reject(this._log('Invalid set payload', payload));
      nativeTheme.themeSource = payload.value;
      return resolve(this._storage.set(payload.key, payload.value));
    });
  }
}
