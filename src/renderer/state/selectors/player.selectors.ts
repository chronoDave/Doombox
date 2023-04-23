import store from '../store';

import { getSong } from './song.selector';

export const getCurrent = () => {
  const { player } = store.get();
  return player.current.id ?
    getSong(player.current.id) :
    null;
};
