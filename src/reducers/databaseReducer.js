import {
  RECEIVE_LABEL_LIST,
  RECEIVE_ALBUM_LIST,
  RECEIVE_SONG_LIST,
  RECEIVE_ALBUMS,
  RECEIVE_SONGS,
  RECEIVE_ROOT_FOLDER,
  RECEIVE_LABEL_SIZE,
  RECEIVE_ALBUM_SIZE,
  RECEIVE_SONG_SIZE
} from '../actionTypes/databaseTypes';

export const databaseReducer = (
  state = {
    labelList: [],
    labelSize: 0,
    albumList: [],
    albumSize: 0,
    songList: [],
    songSize: 0,
    folderPath: ''
  },
  action
) => {
  switch (action.type) {
    case RECEIVE_LABEL_LIST: {
      return {
        ...state,
        labelList: action.payload.payload
      };
    }
    case RECEIVE_ALBUM_LIST: {
      return {
        ...state,
        albumList: action.payload.payload
      };
    }
    case RECEIVE_SONG_LIST: {
      return {
        ...state,
        songList: action.payload.payload
      };
    }
    case RECEIVE_ALBUMS: {
      return {
        ...state,
        albumList: action.payload.payload
      };
    }
    case RECEIVE_SONGS: {
      return {
        ...state,
        songList: action.payload.payload
      };
    }
    case RECEIVE_ROOT_FOLDER: {
      return {
        ...state,
        folderPath: action.payload.payload
      };
    }
    case RECEIVE_LABEL_SIZE: {
      return {
        ...state,
        labelSize: action.payload.payload
      };
    }
    case RECEIVE_ALBUM_SIZE: {
      return {
        ...state,
        albumSize: action.payload.payload
      };
    }
    case RECEIVE_SONG_SIZE: {
      return {
        ...state,
        songSize: action.payload.payload
      };
    }
    default:
      return state;
  }
};
