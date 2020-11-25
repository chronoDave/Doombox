import { STATUS } from '@doombox-utils/types';
import { CONFIG } from '@doombox-config';

import { createReduxSlice } from '../utils';

const initialState = {
  metadata: { covers: [] },
  status: STATUS.AUDIO.STOPPED,
  autoplay: CONFIG.player.autoplay,
  duration: 0,
  muted: false,
  volume: 1,
  position: 0
};

const reducers = {
  setPlayer: (state, payload) => ({ ...state, ...payload }),
  setMetadata: (state, metadata) => ({ ...state, metadata: { covers: [], ...metadata } }),
  setStatus: (state, status) => ({ ...state, status }),
  setAutoplay: (state, autoplay) => ({ ...state, autoplay }),
  setDuration: (state, duration) => ({ ...state, duration }),
  setMuted: (state, muted) => ({ ...state, muted }),
  setVolume: (state, volume) => ({ ...state, volume }),
  setPosition: (state, position) => ({ ...state, position })
};

export const playerSlice = createReduxSlice('player', initialState, reducers);
