import type { IpcApi } from '../types/ipc';

declare global {
  interface Window {
    ipc: IpcApi
  }
}
