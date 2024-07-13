import type { TransferController } from '../../types/ipc';
import type { ThemeShape } from '../../types/shapes/theme.shape';
import type Storage from '../lib/storage/storage';

import { nativeTheme } from 'electron';

export type ThemeControllerProps = {
  storage: Storage<ThemeShape>
};

export default (props: ThemeControllerProps): TransferController['theme'] => ({
  get: async () => props.storage.state,
  set: async theme => {
    props.storage.set(() => theme);
    nativeTheme.themeSource = theme.theme;

    return props.storage.state;
  }
});
