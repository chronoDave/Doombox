import {
  CONFIG,
  STATUS,
  TYPES
} from '@doombox/utils';

// Types
import { AUDIO } from '../types';

const initialState = {
  metadata: {},
  player: {
    status: STATUS.AUDIO.STOPPED,
    autoplay: CONFIG[TYPES.CONFIG.PLAYER].autoplay,
    duration: 0,
    muted: false
  },
  playlist: {
    name: '',
    cover: null,
    collection: []
  },
  volume: 1,
  position: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUDIO.SET_METADATA:
      return ({
        ...state,
        metadata: {
          ...state.metadata,
          ...action.payload
        }
      });
    case AUDIO.SET_PLAYER:
      return ({
        ...state,
        player: {
          ...state.player,
          ...action.payload
        }
      });
    case AUDIO.SET_PLAYLIST:
      return ({
        ...state,
        playlist: {
          ...state.playlist,
          ...action.payload
        }
      });
    case AUDIO.SET_VOLUME:
      return ({
        ...state,
        volume: action.payload
      });
    case AUDIO.SET_POSITION:
      return ({
        ...state,
        position: action.payload
      });
    default:
      return state;
  }
};

const actions = {
  setMetadata: payload => ({ type: AUDIO.SET_METADATA, payload }),
  setPlayer: payload => ({ type: AUDIO.SET_PLAYER, payload }),
  setPlaylist: payload => ({ type: AUDIO.SET_PLAYLIST, payload }),
  setVolume: payload => ({ type: AUDIO.SET_VOLUME, payload }),
  setPosition: payload => ({ type: AUDIO.SET_POSITION, payload })
};

export const audioSlice = {
  name: 'audio',
  reducer,
  actions
};
