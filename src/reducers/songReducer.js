import {
  SET_VOLUME,
  SET_POSITION,
  SET_STATUS,
} from '../actionTypes/songTypes';
import { RECEIVE_SONG } from '../actionTypes/databaseTypes';

export const songReducer = (
  state = {
    url: '',
    id: '',
    playStatus: 'STOPPED',
    position: 0,
    volume: 100,
    duration: 0,
    artist: false,
    title: false,
    album: false,
    cover: false
  },
  action
) => {
  switch (action.type) {
    case SET_VOLUME: {
      return {
        ...state,
        volume: action.payload
      };
    }
    case SET_POSITION: {
      return {
        ...state,
        position: action.payload
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        playStatus: action.payload
      };
    }
    case RECEIVE_SONG: {
      return {
        ...state,
        id: action.payload.payload._id,
        url: action.payload.payload.url,
        artist: action.payload.payload.artist,
        album: action.payload.payload.album,
        title: action.payload.payload.title,
        track: action.payload.payload.track,
        duration: action.payload.payload.duration,
        cover: action.payload.payload.cover
      };
    }
    default:
      return state;
  }
};
