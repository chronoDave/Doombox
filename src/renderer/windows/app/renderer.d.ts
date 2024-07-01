import type { Api } from '@doombox/types/ipc';

declare global {
  interface Window {
    ipc: Api
    dir: {
      thumbs: string
    }
  }
}
