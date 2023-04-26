import type { State } from '../types/state';
import type Store from './store';

import produce from 'immer';

import appShape from '../../types/shapes/app.shape';
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
      .on('status', status => this._store.dispatch(produce(draft => {
        draft.player.status = status;
      }), 'player.status'))
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
}
