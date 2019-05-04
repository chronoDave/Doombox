import {
  SET_VOLUME,
  SET_POSITION,
  SET_STATUS,
  SET_SONG,
  DECREASE_VOLUME,
  INCREASE_VOLUME,
  TOGGLE_STATUS
} from '../actionTypes/songTypes';

// eslint-disable-next-line no-undef
const { ipcRenderer } = window.require('electron');

export const setVolume = volume => dispatch => {
  dispatch({
    type: SET_VOLUME,
    payload: volume
  });
};

export const decreaseVolume = () => dispatch => {
  dispatch({
    type: DECREASE_VOLUME
  });
};

export const increaseVolume = () => dispatch => {
  dispatch({
    type: INCREASE_VOLUME
  });
};

export const toggleStatus = () => dispatch => {
  dispatch({
    type: TOGGLE_STATUS
  });
};

export const setPosition = position => dispatch => {
  dispatch({
    type: SET_POSITION,
    payload: position
  });
};

export const setStatus = status => dispatch => {
  dispatch({
    type: SET_STATUS,
    payload: status
  });
  ipcRenderer.send(SET_STATUS, status);
};

export const setSong = song => dispatch => {
  dispatch({
    type: SET_SONG,
    payload: song
  });
  ipcRenderer.send(SET_SONG, song);
};
