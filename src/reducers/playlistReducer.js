import {
  SET_PLAYLIST,
  SET_PLAYLIST_INDEX,
  SHUFFLE_PLAYLIST,
  PUSH_PLAYLIST,
  POP_PLAYLIST,
  SET_CUSTOM_PLAYLIST
} from '../actionTypes/playlistTypes';

// Utils
import { shuffleArray } from '../functions';

export const playlistReducer = (
  state = {
    collection: [],
    size: 0,
    index: 0,
  },
  action
) => {
  switch (action.type) {
    case SET_PLAYLIST: {
      return {
        ...state,
        collection: action.payload,
        size: action.payload.length,
      };
    }
    case PUSH_PLAYLIST: {
      return {
        ...state,
        collection: state.collection.concat(action.payload),
        size: state.size + action.payload.length
      };
    }
    case SET_PLAYLIST_INDEX: {
      return {
        ...state,
        index: action.payload
      };
    }
    case SHUFFLE_PLAYLIST: {
      return ({
        ...state,
        collection: shuffleArray(state.collection)
      });
    }
    default:
      return state;
  }
};
