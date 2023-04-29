import type { IpcChannel, IpcInvokeController } from '../../types/ipc';
import type { ThemeShape } from '../../types/shapes/theme.shape';
import type Storage from '../lib/storage/storage';

import { nativeTheme } from 'electron';

export type ThemeControllerProps = {
  storage: Storage<ThemeShape>
};

export default (props: ThemeControllerProps) =>
  (): IpcInvokeController[IpcChannel.Theme] => ({
    get: async () => props.storage.get(),
    set: async payload => {
      const theme = props.storage.set(payload);
      nativeTheme.themeSource = theme.theme;
      return theme;
    }
  });
