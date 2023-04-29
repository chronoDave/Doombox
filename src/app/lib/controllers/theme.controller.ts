import type { IpcChannel, IpcInvokeController } from '../../../types/ipc';
import type { ThemeShape } from '../../../types/shapes/theme.shape';
import type Storage from '../storage/storage';

import { nativeTheme } from 'electron';

export type ThemeControllerProps = {
  storage: Storage<ThemeShape>
};

export default (props: ThemeControllerProps) =>
  (): IpcInvokeController[IpcChannel.Theme] => ({
    all: async () => props.storage.all(),
    get: async payload => props.storage.get(payload),
    set: async payload => {
      const theme = props.storage.set(payload);
      nativeTheme.themeSource = theme.theme;
      return theme;
    }
  });
