import {
  RECEIVE_LABEL_LIST,
  RECEIVE_ALBUM_LIST,
  RECEIVE_SONG_LIST,
  RECEIVE_ALBUMS,
  RECEIVE_SONGS,
  RECEIVE_ROOT_FOLDER
} from '../actionTypes/databaseTypes';

export const databaseReducer = (
  state = {
    labelList: false,
    albumList: false,
    songList: false,
    folderPath: false
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
    default:
      return state;
  }
};
