import type { Api } from './ipc';

declare global {
  interface Window {
    ipc: Api
  }
}
