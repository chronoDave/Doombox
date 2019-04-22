import {
  DELETE_DATABASE
} from '../actionTypes/databaseTypes';

import {
  RECEIVE_LABEL_LIST,
  RECEIVE_ALBUM_LIST,
  RECEIVE_SONG_LIST,
  RECEIVE_SIZES,
} from '../actionTypes/receiveTypes';

export const databaseReducer = (
  state = {
    labelList: [],
    labelSize: 0,
    albumList: [],
    albumSize: 0,
    songList: [],
    songSize: 0,
  },
  action
) => {
  switch (action.type) {
    case RECEIVE_LABEL_LIST: {
      return {
        ...state,
        labelList: action.payload,
      };
    }
    case RECEIVE_ALBUM_LIST: {
      return {
        ...state,
        albumList: action.payload,
      };
    }
    case RECEIVE_SONG_LIST: {
      return {
        ...state,
        songList: action.payload,
      };
    }
    case RECEIVE_SIZES: {
      return {
        ...state,
        labelSize: action.payload.label,
        albumSize: action.payload.album,
        songSize: action.payload.song
      };
    }
    case DELETE_DATABASE: {
      return {
        ...state,
        labelList: [],
        labelSize: 0,
        albumList: [],
        albumSize: 0,
        songList: [],
        songSize: 0,
      };
    }
    default:
      return state;
  }
};
