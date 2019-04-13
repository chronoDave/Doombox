import {
  RECEIVE_LABEL_LIST,
  RECEIVE_ALBUM_LIST,
  RECEIVE_SONG_LIST,
  RECEIVE_SIZES
} from '../actionTypes/receiveTypes';

import {
  VIEW_LABEL,
  VIEW_ALBUM,
  VIEW_SONG
} from '../actionTypes/windowTypes';

export const receiveCollection = (payload, type) => dispatch => {
  switch (type) {
    case VIEW_LABEL:
      return dispatch({ type: RECEIVE_LABEL_LIST, payload });
    case VIEW_ALBUM:
      return dispatch({ type: RECEIVE_ALBUM_LIST, payload });
    case VIEW_SONG:
      return dispatch({ type: RECEIVE_SONG_LIST, payload });
    default:
      return null;
  }
};

export const receiveSizes = payload => dispatch => dispatch({ type: RECEIVE_SIZES, payload });
