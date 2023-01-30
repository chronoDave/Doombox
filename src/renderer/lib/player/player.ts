import type { Song } from '../../../types/library';
import type { AppShape } from '../../../types/shapes/app.shape';
import type { UserShape } from '../../../types/shapes/user.shape';

import { Howl } from 'howler';

import clamp from '../../../utils/number/clamp';

export enum PlayerStatus {
  Playing = 'playing',
  Paused = 'paused',
  Stopped = 'stopped'
}

export type PlayerOptions = AppShape['player'] & UserShape['player'];

export class Player {
  private _autoplay: boolean;
  private _muted: boolean;
  private _volume: number;
  private _status = PlayerStatus.Stopped;
  private _howl?: Howl;

  private _load(song: Pick<Song, '_id' | 'file'>) {
    this._howl?.unload();
    this._howl = new Howl({
      src: song.file,
      html5: true,
      volume: this._volume,
      autoplay: this._autoplay,
      mute: this._muted,
      onload: () => {},
      onplay: () => {
        this._status = PlayerStatus.Playing;
      },
      onpause: () => {
        this._status = PlayerStatus.Paused;
      },
      onstop: () => {
        this._status = PlayerStatus.Stopped;
      },
      onend: () => {},
      onmute: () => {},
      onloaderror: () => {}
    });
  }

  set autoplay(autoplay: boolean) {
    this._autoplay = autoplay;
  }

  set volume(number: number) {
    this._volume = clamp(0, 1, number);
  }

  constructor(options: PlayerOptions) {
    this._volume = options.volume;
    this._autoplay = options.autoplay;
    this._muted = options.muted;
  }

  play(song?: Pick<Song, '_id' | 'file'>) {
    if (song) this._load(song);
    if (this._status !== PlayerStatus.Playing) this._howl?.play();
  }

  pause() {
    if (this._status === PlayerStatus.Playing) this._howl?.pause();
    if (this._status === PlayerStatus.Paused) this._howl?.play();
  }

  stop() {
    this._howl?.stop();
    this._howl?.unload();
  }

  mute(muted?: boolean) {
    this._muted = muted ?? !this._muted;
    this._howl?.mute(this._muted);
  }
}
