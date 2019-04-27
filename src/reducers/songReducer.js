import {
  SET_VOLUME,
  SET_POSITION,
  SET_STATUS,
  SET_SONG,
  DECREASE_VOLUME,
  INCREASE_VOLUME,
  TOGGLE_STATUS
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
    case INCREASE_VOLUME: {
      return {
        ...state,
        volume: state.volume < 100 ? state.volume + 1 : state.volume
      };
    }
    case TOGGLE_STATUS: {
      return {
        ...state,
        playStatus: state.playStatus === 'PLAYING' ? 'PAUSED' : 'PLAYING'
      };
    }
    case DECREASE_VOLUME: {
      return {
        ...state,
        volume: state.volume > 0 ? state.volume - 1 : state.volume
      };
    }
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
        ...action.payload,
        position: 0
      };
    }
    default:
      return state;
  }
};
