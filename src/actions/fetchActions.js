import {
  FETCH_ALL,
  FETCH_BACKGROUND_IMAGE,
  FETCH_PLAYLISTS
} from '../actionTypes/fetchTypes';

// eslint-disable-next-line no-undef
const { ipcRenderer } = window.require('electron');

export const fetchAll = (view, options) => dispatch => {
  dispatch({ type: FETCH_ALL });

  ipcRenderer.send(FETCH_ALL, {
    view,
    options: options || [{ label: 1 }, { album: 1 }, { track: 1 }, { year: 1 }]
  });
};

export const fetchBackground = () => dispatch => {
  dispatch({ type: FETCH_BACKGROUND_IMAGE });
  ipcRenderer.send(FETCH_BACKGROUND_IMAGE);
};

export const fetchPlaylists = () => {
  ipcRenderer.send(FETCH_PLAYLISTS);
};
