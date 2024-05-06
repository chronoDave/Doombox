import type { IpcApi } from '@doombox/types/ipc';

declare global {
  interface Window {
    ipc: IpcApi
    dir: {
      thumbs: string
    }
  }
}
