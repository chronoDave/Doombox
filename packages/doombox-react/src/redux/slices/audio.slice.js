import { AUDIO } from '../types';

const initialState = {
  song: {},
  player: {
    status: null,
    autoplay: null,
    duration: null,
    muted: null
  },
  playlist: {
    name: null,
    cover: null,
    collection: []
  },
  volume: null,
  position: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUDIO.SET_SONG:
      return ({
        ...state,
        song: action.payload
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
  setSong: song => ({
    type: AUDIO.SET_SONG,
    payload: song
  }),
  setPlayer: player => ({
    type: AUDIO.SET_PLAYER,
    payload: player
  }),
  setPlaylist: playlist => ({
    type: AUDIO.SET_PLAYLIST,
    payload: playlist
  }),
  setVolume: volume => ({
    type: AUDIO.SET_VOLUME,
    payload: volume
  }),
  setPosition: position => ({
    type: AUDIO.SET_POSITION,
    payload: position
  })
};

export const audioSlice = {
  name: 'audio',
  reducer,
  actions
};
