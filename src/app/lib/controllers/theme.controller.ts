import type { IpcChannel, IpcInvokeController } from '../../../types/ipc';
import type { ThemeShape } from '../../../types/shapes/theme.shape';
import type Storage from '../storage';

import { nativeTheme } from 'electron';

export type ThemeControllerProps = {
  storage: Storage<ThemeShape>
};

export default (props: ThemeControllerProps) =>
  (): IpcInvokeController[IpcChannel.Theme] => ({
    all: async () => props.storage.all(),
    get: async payload => props.storage.get(payload.key),
    set: async payload => {
      nativeTheme.themeSource = payload.value;
      props.storage.set(payload.key, payload.value);
      return props.storage.all();
    }
  });
