import produce from 'immer';

import appShape from '../../types/shapes/app.shape';
import userShape from '../../types/shapes/user.shape';
import Player, { PlayerStatus } from '../lib/player';

// eslint-disable-next-line import/no-cycle
import { next } from './actions/playlist.actions';
import store from './store';

const player = new Player({
  ...appShape.player,
  ...userShape.player,
  onstatus: status => {
    if (
      status === PlayerStatus.Ended &&
      store.get().playlist.index < store.get().playlist.songs.length
    ) {
      next();
    } else {
      store.dispatch(produce(draft => {
        draft.player.status = status;
      }), 'player.status');
    }
  },
  onduration: duration => store.dispatch(produce(draft => {
    draft.player.current.duration = duration;
  }), 'player.duration'),
  onposition: position => store.dispatch(produce(draft => {
    draft.player.current.position = position;
  }), 'player.position')
});

export default player;
