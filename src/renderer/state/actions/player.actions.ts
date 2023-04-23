import produce from 'immer';

import player from '../player';
import { getSong } from '../selectors/song.selector';
import store from '../store';

export const play = (id: string) => {
  store.dispatch(produce(draft => {
    draft.player.current.id = id;

    const i = draft.playlist.songs.findIndex(song => song === id);
    if (i >= 0) draft.playlist.index = i;
  }), 'player.play');

  player.play(getSong(id).file);
};

export const pause = () => player.pause();

export const seek = (pos: number) => {
  store.dispatch(produce(draft => {
    draft.player.current.position = pos;
  }), 'player.seek');

  player.seek(pos);
};

export const mute = () => {
  const state = store.get();

  store.dispatch(produce(draft => {
    draft.player.muted = !state.player.muted;
  }), 'player.mute');

  player.mute(!state.player.muted);
};

export const setVolume = (volume: number) => {
  store.dispatch(produce(draft => {
    draft.player.volume = volume;
  }), 'player.volume');

  player.volume = volume;
};
