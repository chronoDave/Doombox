import type { IpcApi } from '../types/ipc';
import type store from './store/store';

declare global {
  interface Window {
    ipc: IpcApi
    store: typeof store
  }
}
