import type { ElectronApi } from '../types';

declare global {
  interface Window {
    electronApi: ElectronApi
  }
}
