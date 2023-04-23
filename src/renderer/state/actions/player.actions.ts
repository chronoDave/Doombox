import type { Song } from '../../../types/library';

import produce from 'immer';

import appShape from '../../../types/shapes/app.shape';
import userShape from '../../../types/shapes/user.shape';
import { Player } from '../../lib/player';
import store from '../store';

const player = new Player({
  ...appShape.player,
  ...userShape.player
})
  .on('status', status => store.dispatch(produce(draft => {
    draft.player.status = status;
  }), 'player.status'))
  .on('duration', duration => store.dispatch(produce(draft => {
    draft.player.current.duration = duration;
  }), 'player.duration'))
  .on('position', position => store.dispatch(produce(draft => {
    draft.player.current.position = position;
  }), 'player.position'));

export const play = (song: Song) => {
  store.dispatch(produce(draft => {
    draft.player.current.id = song._id;
  }), 'player.play');

  player.play(song.file);
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
