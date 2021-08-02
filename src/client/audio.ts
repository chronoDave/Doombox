import fs from 'fs';
import EventEmitter from 'events';

import { ipcError } from './ipc/ipc';

const AUDIO_EVENTS = {
  MUTE: 'MUTE',
  VOLUME: 'VOLUME'
} as const;

export type AudioEvent = keyof typeof AUDIO_EVENTS;

export default new class extends EventEmitter {
  private context = new window.AudioContext();
  private nodeGain: GainNode;

  private _volume = 0;
  private _muted = false;

  constructor() {
    super();

    this.nodeGain = this.context.createGain();
    this.nodeGain.connect(this.context.destination);
  }

  async load(src: string) {
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

  mute(muted: boolean) {
    this._muted = muted;

    if (this._muted) {
      this.nodeGain.gain.setValueAtTime(0, this.context.currentTime);
    } else {
      this.nodeGain.gain.setValueAtTime(this.volume, this.context.currentTime);
    }

    this.emit(AUDIO_EVENTS.MUTE, this._muted);
  }

  get volume() {
    return this._volume;
  }

  set volume(volume: number) {
    this._volume = volume;
    this.nodeGain.gain.setValueAtTime(0, this.context.currentTime);
    this.emit(AUDIO_EVENTS.VOLUME, this._volume);
  }
}();
