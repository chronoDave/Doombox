import type { AppShape } from '../../types/shapes/app.shape';
import type { UserShape } from '../../types/shapes/user.shape';

import { Howl } from 'howler';

import Observer from './observer';

export enum PlayerStatus {
  Playing = 'playing',
  Paused = 'paused',
  Stopped = 'stopped'
}

export type PlayerListener = {
  status: (status: PlayerStatus) => void
  duration: (duration: number) => void
  position: (position: number) => void
};

export type PlayerOptions = AppShape['player'] & UserShape['player'];

export class Player extends Observer<PlayerListener> {
  // private _autoplay: boolean;
  private _muted: boolean;
  private _status = PlayerStatus.Stopped;
  private _howl?: Howl;
  private _interval?: number;
  private _file?: string;

  set volume(volume: number) {
    if (this._howl) this._howl.volume(volume / 100);
  }

  get pos() {
    return this._howl?.seek() ?? 0;
  }

  constructor(options: PlayerOptions) {
    super();

    // this._volume = options.volume;
    // this._autoplay = options.autoplay;
    this._muted = options.muted;
  }

  play(file: string) {
    this._file = file;
    this._howl?.unload();
    this._howl = new Howl({
      src: file,
      html5: true,
      // volume: this._volume,
      // autoplay: this._autoplay,
      mute: this._muted,
      onload: () => {
        const duration = this._howl?.duration();
        if (duration) this._emit('duration', duration);
      },
      onplay: () => {
        if (this._interval) window.clearInterval(this._interval);
        this._interval = window.setInterval(() => {
          this._emit('position', this._howl?.seek() ?? 0);
        }, 1000);

        this._status = PlayerStatus.Playing;

        this._emit('status', this._status);
        this._emit('position', this.pos);
      },
      onpause: () => {
        if (this._interval) window.clearInterval(this._interval);

        this._status = PlayerStatus.Paused;

        this._emit('status', this._status);
      },
      onstop: () => {
        if (this._interval) window.clearInterval(this._interval);

        this._status = PlayerStatus.Stopped;

        this._emit('status', this._status);
      },
      onend: () => {
        if (this._interval) window.clearInterval(this._interval);

        this._status = PlayerStatus.Stopped;

        this._emit('status', this._status);
      },
      onmute: () => {},
      onloaderror: (_, err) => console.error(err)
    });
  }

  pause() {
    if (this._status === PlayerStatus.Playing) this._howl?.pause();
    if (this._status === PlayerStatus.Paused) this._howl?.play();
    if (this._status === PlayerStatus.Stopped && this._file) this.play(this._file);
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
