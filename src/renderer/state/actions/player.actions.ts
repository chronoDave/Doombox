import type { Song } from '../../../types/library';

import produce from 'immer';

import appShape from '../../../types/shapes/app.shape';
import userShape from '../../../types/shapes/user.shape';
import { Player } from '../../lib/player';
import store from '../store';

const player = new Player({
  ...appShape.player,
  ...userShape.player,
  listener: {
    onstatus: status => store.dispatch(produce(draft => {
      draft.player.status = status;
    })),
    onduration: duration => store.dispatch(produce(draft => {
      draft.player.current.duration = duration;
    })),
    onposition: position => store.dispatch(produce(draft => {
      draft.player.position = position;
    }))
  }
});

export const play = (song?: Song) => {
  if (song) {
    store.dispatch(produce(draft => {
      draft.player.current.id = song._id;
    }));
  }

  player.play(song?.file);
};

export const seek = (pos: number) => {
  store.dispatch(produce(draft => {
    draft.player.position = pos;
  }));

  player.seek(pos);
};

export const setCurrent = (current: { id: string, duration: number }) => {
  store.dispatch(produce(draft => {
    draft.player.current = current;
  }));
};
