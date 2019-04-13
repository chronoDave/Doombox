import {
  FETCH_ALL
} from '../actionTypes/fetchTypes';

// eslint-disable-next-line no-undef
const { ipcRenderer } = window.require('electron');

export const fetchAll = view => dispatch => {
  dispatch({ type: FETCH_ALL });
  ipcRenderer.send(FETCH_ALL, view);
};
