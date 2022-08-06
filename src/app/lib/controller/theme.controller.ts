import type { ThemeShape } from '../../../types/shapes/theme.shape';
import type { IpcPayloadSet } from '../../../types/ipc';

import { nativeTheme } from 'electron';

import StorageController from './storage.controller';

export default class ThemeController extends StorageController<ThemeShape> {
  protected _set(payload: IpcPayloadSet<ThemeShape>) {
    if (payload.key === 'theme') nativeTheme.themeSource = payload.value;
    return super._set(payload);
  }
}
