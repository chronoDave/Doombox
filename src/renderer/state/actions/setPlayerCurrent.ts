import produce from 'immer';

import store from '../store';

const setPlayerCurrent = (current: { id: string, duration: number }) =>
  store.dispatch(produce(draft => {
    draft.player.current = current;
  }));

export default setPlayerCurrent;
