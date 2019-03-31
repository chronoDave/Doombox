import {
  SET_VOLUME,
  SET_POSITION,
  SET_STATUS,
} from '../actionTypes/songTypes';
import { RECEIVE_SONG } from '../actionTypes/databaseTypes';

export const songReducer = (
  state = {
    url: '',
    id: undefined,
    playStatus: 'STOPPED',
    position: 0,
    volume: 100,
    duration: 0,
    artist: undefined,
    title: undefined,
    album: undefined,
    cover: undefined
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
        id: action.payload.song._id,
        url: action.payload.song.url,
        artist: action.payload.song.artist,
        album: action.payload.song.album,
        title: action.payload.song.title,
        track: action.payload.song.track,
        duration: action.payload.song.duration,
        cover: action.payload.song.cover
      };
    }
    default:
      return state;
  }
};
