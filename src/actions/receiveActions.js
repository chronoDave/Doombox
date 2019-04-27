import {
  RECEIVE_LABEL_LIST,
  RECEIVE_ALBUM_LIST,
  RECEIVE_SONG_LIST,
  RECEIVE_SIZES,
  RECEIVE_DATABASE_CREATED,
  RECEIVE_SEARCH_LIST,
  RECEIVE_SEARCH_SIZE,
  RECEIVE_SEARCH_QUERY
} from '../actionTypes/receiveTypes';

import {
  VIEW_LABEL,
  VIEW_ALBUM,
  VIEW_SONG,
  VIEW_SEARCH,
  SET_VIEW
} from '../actionTypes/windowTypes';

export const receiveCollection = (payload, type) => dispatch => {
  switch (type) {
    case VIEW_LABEL:
      return dispatch({ type: RECEIVE_LABEL_LIST, payload });
    case VIEW_ALBUM:
      return dispatch({ type: RECEIVE_ALBUM_LIST, payload });
    case VIEW_SONG:
      return dispatch({ type: RECEIVE_SONG_LIST, payload });
    case VIEW_SEARCH:
      return (
        dispatch({ type: RECEIVE_SEARCH_LIST, payload }),
        dispatch({ type: SET_VIEW, payload: VIEW_SEARCH })
      );
    default:
      return null;
  }
};

export const receiveDatabaseCreated = () => dispatch => dispatch({
  type: RECEIVE_DATABASE_CREATED
});

export const receiveSizes = payload => dispatch => dispatch({
  type: RECEIVE_SIZES,
  payload
});

export const receiveSearchSize = payload => dispatch => dispatch({
  type: RECEIVE_SEARCH_SIZE,
  payload
});

export const receiveSearchQuery = payload => dispatch => dispatch({
  type: RECEIVE_SEARCH_QUERY,
  payload
});
