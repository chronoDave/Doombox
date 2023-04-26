import type Store from '../lib/store';
import type { State } from '../types/state';

import { getSong } from './song.selector';

export const getCurrent = (store: Store<State>) =>
  () => {
    const { player } = store.get();
    return player.current.id ?
      getSong(store)(player.current.id) :
      null;
  };
