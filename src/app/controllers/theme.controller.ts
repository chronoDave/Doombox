import type { IpcChannel, IpcInvokeController } from '../../types/ipc';
import type { ThemeShape } from '../../types/shapes/theme.shape';
import type Storage from '../lib/storage/storage';

import produce from 'immer';

export default (store: Storage<ThemeShape>) =>
  (): IpcInvokeController[IpcChannel.Theme] => ({
    select: payload => store.select(payload),
    set: payload => {
      store.set(produce(draft => {
        draft.theme = payload.theme;
      }), 'theme.controller.set');
    }
  });
