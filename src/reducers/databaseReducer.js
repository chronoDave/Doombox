import {
  DELETE_DATABASE
} from '../actionTypes/databaseTypes';

import {
  RECEIVE_LABEL_LIST,
  RECEIVE_ALBUM_LIST,
  RECEIVE_SONG_LIST,
  RECEIVE_SEARCH_LIST,
  RECEIVE_SIZES,
  RECEIVE_SEARCH_SIZE,
  RECEIVE_SEARCH_QUERY
} from '../actionTypes/receiveTypes';

export const databaseReducer = (
  state = {
    labelList: [],
    labelSize: 0,
    albumList: [],
    albumSize: 0,
    songList: [],
    songSize: 0,
    searchList: [],
    searchSize: 0,
    searchQuery: ''
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
    case RECEIVE_SEARCH_LIST: {
      return {
        ...state,
        searchList: action.payload
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
    case RECEIVE_SEARCH_SIZE: {
      return {
        ...state,
        searchSize: action.payload
      };
    }
    case RECEIVE_SEARCH_QUERY: {
      return {
        ...state,
        searchQuery: action.payload
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
        searchList: [],
        searchSize: 0
      };
    }
    default:
      return state;
  }
};
