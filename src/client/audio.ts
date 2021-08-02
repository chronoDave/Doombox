import fs from 'fs';

import { ipcError } from './ipc/ipc';

export default class {
  private static context = new window.AudioContext();

  static async load(src: string) {
    try {
      const file = await fs.promises.readFile(src);
      const buffer = await this.context.decodeAudioData(file.buffer);
      const instance = this.context.createBufferSource();

      instance.buffer = buffer;
      instance.connect(this.context.destination);

      return await Promise.resolve(instance);
    } catch (err) {
      console.error(err);
      ipcError('Audio', err, `Failed to load file: ${src}`);

      return Promise.reject(err);
    }
  }
}
