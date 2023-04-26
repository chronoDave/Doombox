import type { State } from '../types/state';
import type Store from './store';

import produce from 'immer';

import appShape from '../../types/shapes/app.shape';
import clamp from '../../utils/number/clamp';
import { getSong } from '../selectors/song.selector';

import Audio, { AudioStatus } from './audio';

export default class Player<S extends Store<State>> {
  private readonly _store: S;
  private readonly _audio: Audio;

  get current() {
    return this._store.get().player.current;
  }

  get status() {
    return this._store.get().player.status;
  }

  get muted() {
    return this._store.get().player.muted;
  }

  get volume() {
    return this._store.get().player.volume;
  }

  constructor(store: S) {
    this._store = store;
    this._audio = new Audio({
      ...store.get().user.player,
      ...appShape.player
    })
      .on('status', status => {
        this._store.dispatch(produce(draft => {
          draft.player.status = status;
        }), 'player.status');
        if (
          status === AudioStatus.Ended &&
          this._store.get().player.autoplay
        ) this.next();
      })
      .on('position', position => this._store.dispatch(produce(draft => {
        draft.player.current.position = position;
      }), 'player.position'))
      .on('duration', duration => this._store.dispatch(produce(draft => {
        draft.player.current.duration = duration;
      }), 'player.duration'))
      .on('mute', muted => this._store.dispatch(produce(draft => {
        draft.player.muted = muted ?? !draft.player.muted;
      }), 'player.mute'));
  }

  play(id: string) {
    this._store.dispatch(produce(draft => {
      draft.player.current.id = id;
    }), 'player.play');

    const { file } = getSong(this._store)(id);
    this._audio.play(file);
  }

  pause() {
    const { player } = this._store.get();

    if (player.status === AudioStatus.Playing) return this._audio.pause();
    return this._audio.resume();
  }

  seek(position: number) {
    this._store.dispatch(produce(draft => {
      draft.player.current.position = position;
    }), 'player.seek');
    this._audio.seek(position);
  }

  mute(muted?: boolean) {
    this._audio.mute(muted);
  }

  /** Integer range between 0-100  */
  setVolume(volume: number) {
    this._store.dispatch(produce(draft => {
      draft.player.volume = volume;
    }), 'player.volume');
    this._audio.volume = volume;
  }

  skip(n: number) {
    const i = clamp(0, this._store.get().playlist.songs.length - 1, n);
    const id = this._store.get().playlist.songs[i];

    this._store.dispatch(produce(draft => {
      draft.playlist.index = i;
    }), 'player.skip');
    this.play(id);
  }

  next() {
    const { playlist } = this._store.get();

    let next = playlist.index + 1;
    if (next === playlist.songs.length) next = 0;

    this.skip(next);
  }

  previous() {
    const { playlist } = this._store.get();

    let previous = playlist.index - 1;
    if (previous < 0) previous = playlist.songs.length - 1;

    this.skip(previous);
  }
}
