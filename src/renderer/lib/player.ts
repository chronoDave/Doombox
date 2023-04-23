import type { AppShape } from '../../types/shapes/app.shape';
import type { UserShape } from '../../types/shapes/user.shape';

import { Howl } from 'howler';

export enum PlayerStatus {
  Playing = 'playing',
  Paused = 'paused',
  Stopped = 'stopped',
  Ended = 'ended'
}

export type PlayerOptions = AppShape['player'] & UserShape['player'] & {
  onstatus: (status: PlayerStatus) => void
  onduration: (duration: number) => void
  onposition: (position: number) => void
};

export default class Player {
  private readonly _volume: number;
  private readonly _autoplay: boolean;
  private readonly _onstatus: PlayerOptions['onstatus'];
  private readonly _onduration: PlayerOptions['onduration'];
  private readonly _onposition: PlayerOptions['onposition'];

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
    this._onstatus = options.onstatus;
    this._onduration = options.onduration;
    this._onposition = options.onposition;
    this._volume = options.volume;
    this._autoplay = options.autoplay;
    this._muted = options.muted;
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
        if (duration) this._onduration(duration);
      },
      onplay: () => {
        if (this._interval) window.clearInterval(this._interval);
        this._interval = window.setInterval(() => {
          this._onposition(this._howl?.seek() ?? 0);
        }, 1000);

        this._status = PlayerStatus.Playing;

        this._onstatus(this._status);
        this._onposition(this.pos);
      },
      onpause: () => {
        if (this._interval) window.clearInterval(this._interval);

        this._status = PlayerStatus.Paused;
        this._onstatus(this._status);
      },
      onstop: () => {
        if (this._interval) window.clearInterval(this._interval);

        this._status = PlayerStatus.Stopped;
        this._onstatus(this._status);
      },
      onend: () => {
        if (this._interval) window.clearInterval(this._interval);

        this._status = PlayerStatus.Ended;
        this._onstatus(this._status);
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
