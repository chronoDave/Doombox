import produce from 'immer';

import appShape from '../../types/shapes/app.shape';
import userShape from '../../types/shapes/user.shape';
import { Player } from '../lib/player';

import store from './store';

const player = new Player({
  ...appShape.player,
  ...userShape.player,
  listener: {
    onstatus: status => store.dispatch(produce(draft => {
      draft.player.status = status;
    })),
    onduration: duration => store.dispatch(produce(draft => {
      draft.player.current.duration = duration;
    }))
  }
});

export default player;
