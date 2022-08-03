import { contextBridge, ipcRenderer } from 'electron';

import type { ElectronApi } from '../types/electron';
import type { IpcEventGet } from '../types/events';
import type { ThemeShape } from '../types/shapes/theme.shape';

import { IpcAction, IpcChannel } from '../types/ipc';

const electronApi: ElectronApi = {
  getTheme: async <T extends keyof ThemeShape>(key: T) => {
    const event: IpcEventGet<ThemeShape> = {
      action: IpcAction.Get,
      payload: { key }
    };

    return ipcRenderer.invoke(IpcChannel.Theme, event);
  }
};

contextBridge.exposeInMainWorld('electronApi', electronApi);
