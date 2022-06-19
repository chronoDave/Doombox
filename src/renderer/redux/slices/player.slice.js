import { STATUS } from '../../../types';
import { CONFIG } from '../../../config';
import { createReduxSlice } from '../utils';

const initialState = {
  metadata: { images: [], duration: 0 },
  status: STATUS.AUDIO.STOPPED,
  autoplay: CONFIG.player.autoplay,
  muted: false,
  volume: 1,
  position: 0,
  sliding: false
};

const reducers = {
  setPlayer: (state, payload) => ({ ...state, ...payload }),
  setMetadata: (state, metadata) => ({ ...state, metadata: { images: [], ...metadata } }),
  setStatus: (state, status) => ({ ...state, status }),
  setAutoplay: (state, autoplay) => ({ ...state, autoplay }),
  setMuted: (state, muted) => ({ ...state, muted }),
  setVolume: (state, volume) => ({ ...state, volume }),
  setPosition: (state, position) => ({ ...state, position }),
  setSliding: (state, sliding) => ({ ...state, sliding })
};

export default createReduxSlice('player', initialState, reducers);
