import produce from 'immer';

import { AudioStatus } from '../../lib/audio';
import { getCurrent } from '../../selectors/playlist.selector';
import player from '../player';
import store from '../store';

export const addToPlaylist = (ids: string[]) => {
  const autplay =
    store.get().playlist.songs.length === 0 &&
    store.get().player.status !== AudioStatus.Playing;

  store.dispatch(produce(draft => {
    draft.playlist.songs.push(...ids);
  }), 'playlist.add');

  if (autplay) player.play(ids[0]);
};

export const next = () => {
  if (store.get().playlist.index < store.get().playlist.songs.length) {
    store.dispatch(produce(draft => {
      draft.playlist.index += 1;
    }), 'playlist.next');

    player.play(getCurrent(store)());
  }
};
