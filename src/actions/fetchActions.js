import {
  FETCH_ALL,
  FETCH_BACKGROUND_IMAGE
} from '../actionTypes/fetchTypes';

// eslint-disable-next-line no-undef
const { ipcRenderer } = window.require('electron');

export const fetchAll = view => dispatch => {
  dispatch({ type: FETCH_ALL });
  ipcRenderer.send(FETCH_ALL, view);
};

export const fetchBackground = () => dispatch => {
  dispatch({ type: FETCH_BACKGROUND_IMAGE });
  ipcRenderer.send(FETCH_BACKGROUND_IMAGE);
};
