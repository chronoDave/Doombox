import type { ElectronApi } from '../types/electron';

declare global {
  interface Window {
    electronApi: ElectronApi
  }
}
