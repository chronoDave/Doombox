import produce from 'immer';

import appShape from '../../types/shapes/app.shape';
import userShape from '../../types/shapes/user.shape';
import Player from '../lib/player';

import store from './store';

const player = new Player({
  ...appShape.player,
  ...userShape.player,
  onstatus: status => store.dispatch(produce(draft => {
    draft.player.status = status;
  }), 'player.status'),
  onduration: duration => store.dispatch(produce(draft => {
    draft.player.current.duration = duration;
  }), 'player.duration'),
  onposition: position => store.dispatch(produce(draft => {
    draft.player.current.position = position;
  }), 'player.position')
});

export default player;
