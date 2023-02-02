import store from '../store';

import { getSong } from './getSong';

export const getCurrent = () => {
  const { player } = store.get();
  return player.current.id ?
    getSong(player.current.id) :
    null;
};
