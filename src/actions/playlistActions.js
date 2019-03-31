import {
  SET_PLAYLIST,
  POP_PLAYLIST,
  SET_PLAYLIST_INDEX,
  SHUFFLE_PLAYLIST,
  PUSH_PLAYLIST,
  SET_CUSTOM_PLAYLIST
} from '../actionTypes/playlistTypes';

export const setPlaylist = collection => dispatch => {
  dispatch({
    type: SET_PLAYLIST,
    payload: collection
  });
};

export const setCustomPlaylist = collection => dispatch => {
  dispatch({
    type: SET_CUSTOM_PLAYLIST,
    payload: collection
  });
};

export const popPlaylist = () => dispatch => {
  dispatch({
    type: POP_PLAYLIST
  });
};

export const setIndex = index => dispatch => {
  dispatch({
    type: SET_PLAYLIST_INDEX,
    payload: index
  });
};

export const shufflePlaylist = () => dispatch => {
  dispatch({
    type: SHUFFLE_PLAYLIST
  });
};

export const pushPlaylist = collection => dispatch => {
  dispatch({
    type: PUSH_PLAYLIST,
    payload: collection
  });
};
