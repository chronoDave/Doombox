import type { Song } from '../../../types/library';

import produce from 'immer';

import player from '../player';
import store from '../store';

export default (song?: Song) => {
  if (song) {
    store.dispatch(produce(draft => {
      draft.player.current.id = song._id;
    }));
  }

  player.play(song?.file);
};
