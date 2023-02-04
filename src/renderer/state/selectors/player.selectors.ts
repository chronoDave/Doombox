import store from '../store';

import { getSong } from './library.selectors';

export const getCurrent = () => {
  const { player } = store.get();
  return player.current.id ?
    getSong(player.current.id) :
    null;
};
