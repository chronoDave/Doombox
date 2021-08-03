import fs from 'fs';
import { Cache } from '@doombox/config';

import { ipcError, ipcInvoke, ipcSend } from './ipc/ipc';
import store, { setMuted, setVolume } from './redux';

export default new class {
  private context = new window.AudioContext();
  private nodeGain: GainNode;

  private state = {
    volume: 0,
    muted: false
  };

  constructor() {
    this.nodeGain = this.context.createGain();
    this.nodeGain.connect(this.context.destination);

    ipcInvoke<'CACHE', Cache['player']>('CACHE', 'GET')
      .then(payload => {
        this.state = payload.data;

        store.dispatch(setMuted(this.muted));
        store.dispatch(setVolume(this.volume));
      });
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

  get muted() {
    return this.state.muted;
  }

  set muted(muted: boolean) {
    this.state.muted = muted;

    if (this.state.muted) {
      this.nodeGain.gain.setValueAtTime(0, this.context.currentTime);
    } else {
      this.nodeGain.gain.setValueAtTime(this.volume, this.context.currentTime);
    }

    store.dispatch(setMuted(this.muted));
    ipcSend('CACHE', 'MUTE', this.muted);
  }

  get volume() {
    return this.state.volume;
  }

  set volume(volume: number) {
    this.state.volume = volume;
    this.nodeGain.gain.setValueAtTime(0, this.context.currentTime);

    store.dispatch(setVolume(this.volume));
    ipcSend('CACHE', 'MUTE', this.volume);
  }
}();
