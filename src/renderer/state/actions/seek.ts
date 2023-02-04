import produce from 'immer';

import player from '../player';
import store from '../store';

export default (pos: number) => {
  store.dispatch(produce(draft => {
    draft.player.position = pos;
  }));

  player.seek(pos);
};
