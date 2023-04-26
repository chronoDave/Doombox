import { Howl } from 'howler';

import EventEmitter from './eventEmitter';

export enum AudioStatus {
  Playing = 'playing',
  Paused = 'paused',
  Stopped = 'stopped',
  Ended = 'ended'
}

export type AudioEvents = {
  duration: (duration: number) => void
  status: (status: AudioStatus) => void,
  mute: (muted: boolean) => void
};

export type AudioOptions = {
  volume: number
  autoplay: boolean
  muted: boolean
};

export default class Audio extends EventEmitter<AudioEvents> {
  private _autoplay: boolean;
  private _volume: number;
  private _muted: boolean;
  private _howl?: Howl;

  set volume(volume: number) {
    this._volume = volume;
    if (this._howl) this._howl.volume(this._volume / 100);
  }

  set autoplay(autoplay: boolean) {
    this._autoplay = autoplay;
  }

  constructor(options: AudioOptions) {
    super();

    this._volume = options.volume;
    this._autoplay = options.autoplay;
    this._muted = options.muted;
  }

  play(file: string) {
    this._howl?.unload();
    this._howl = new Howl({
      src: file,
      html5: true,
      volume: this._volume,
      autoplay: this._autoplay,
      mute: this._muted,
      onload: () => this._emit('duration', this._howl?.duration() ?? 0),
      onplay: () => this._emit('status', AudioStatus.Playing),
      onpause: () => this._emit('status', AudioStatus.Paused),
      onstop: () => this._emit('status', AudioStatus.Stopped),
      onend: () => this._emit('status', AudioStatus.Ended),
      onmute: () => this._emit('mute', this._muted)
    });
  }

  resume() {
    this._howl?.play();
  }

  pause() {
    this._howl?.pause();
  }

  stop() {
    this._howl?.stop();
    this._howl?.unload();
  }

  mute(muted?: boolean) {
    this._muted = muted ?? !this._muted;
    this._howl?.mute(this._muted);
  }

  seek(pos: number) {
    this._howl?.seek(pos);
  }
}
