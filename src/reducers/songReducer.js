import {
  SET_VOLUME,
  SET_POSITION,
  SET_STATUS,
  SET_SONG
} from '../actionTypes/songTypes';

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
    case SET_SONG: {
      return {
        ...state,
        id: action.payload._id,
        url: action.payload.url,
        artist: action.payload.artist,
        album: action.payload.album,
        title: action.payload.title,
        track: action.payload.track,
        duration: action.payload.duration,
        cover: action.payload.cover
      };
    }
    default:
      return state;
  }
};
