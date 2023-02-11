import type { AppShape } from '../../types/shapes/app.shape';
import type { UserShape } from '../../types/shapes/user.shape';

import { Howl } from 'howler';

export enum PlayerStatus {
  Playing = 'playing',
  Paused = 'paused',
  Stopped = 'stopped'
}

export type PlayerListener = {
  onstatus: (status: PlayerStatus) => void
  onduration: (duration: number) => void
  onposition: (position: number) => void
};

export type PlayerOptions = AppShape['player'] & UserShape['player'] & {
  listener: PlayerListener
};

export class Player {
  private readonly _listener: PlayerListener;

  private _autoplay: boolean;
  private _muted: boolean;
  private _volume: number;
  private _status = PlayerStatus.Stopped;
  private _howl?: Howl;
  private _interval?: number;
  private _file?: string;

  get pos() {
    return this._howl?.seek() ?? 0;
  }

  constructor(options: PlayerOptions) {
    this._volume = options.volume;
    this._autoplay = options.autoplay;
    this._muted = options.muted;
    this._listener = options.listener;
  }

  play(file: string) {
    this._file = file;
    this._howl?.unload();
    this._howl = new Howl({
      src: file,
      html5: true,
      volume: this._volume,
      autoplay: this._autoplay,
      mute: this._muted,
      onload: () => {
        const duration = this._howl?.duration();
        if (duration) this._listener.onduration(duration);
      },
      onplay: () => {
        if (this._interval) window.clearInterval(this._interval);
        this._interval = window.setInterval(() => {
          this._listener.onposition(this._howl?.seek() ?? 0);
        }, 1000);

        this._status = PlayerStatus.Playing;
        this._listener.onstatus(this._status);
        this._listener.onposition(this.pos);
      },
      onpause: () => {
        if (this._interval) window.clearInterval(this._interval);

        this._status = PlayerStatus.Paused;
        this._listener.onstatus(this._status);
      },
      onstop: () => {
        if (this._interval) window.clearInterval(this._interval);

        this._status = PlayerStatus.Stopped;
        this._listener.onstatus(this._status);
      },
      onend: () => {
        if (this._interval) window.clearInterval(this._interval);

        this._status = PlayerStatus.Stopped;
        this._listener.onstatus(this._status);
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
