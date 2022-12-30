import type { IpcApi } from '../types/ipc';
import type { Store } from './store/store';

declare global {
  interface Window {
    ipc: IpcApi
    store: Store
  }
}
