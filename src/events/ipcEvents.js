import {
  RECEIVE_LABEL_LIST,
  RECEIVE_ALBUM_LIST,
  RECEIVE_SONG_LIST,
  RECEIVE_ALBUMS,
  RECEIVE_SONGS,
  RECEIVE_SONG,
  RECEIVE_ROOT_FOLDER,
  RECEIVE_LABEL_SIZE,
  RECEIVE_ALBUM_SIZE,
  RECEIVE_SONG_SIZE
} from '../actionTypes/databaseTypes';

// eslint-disable-next-line no-undef
const { ipcRenderer } = window.require('electron');

export const ipcListener = store => {
  ipcRenderer.on(RECEIVE_LABEL_LIST, (event, arg) => {
    store.dispatch(dispatch => {
      dispatch({ type: RECEIVE_LABEL_LIST, payload: arg });
    });
  });

  ipcRenderer.on(RECEIVE_ALBUM_LIST, (event, arg) => {
    store.dispatch(dispatch => {
      dispatch({ type: RECEIVE_ALBUM_LIST, payload: arg });
    });
  });

  ipcRenderer.on(RECEIVE_SONG_LIST, (event, arg) => {
    store.dispatch(dispatch => {
      dispatch({ type: RECEIVE_SONG_LIST, payload: arg });
    });
  });

  ipcRenderer.on(RECEIVE_ALBUMS, (event, arg) => {
    store.dispatch(dispatch => {
      dispatch({ type: RECEIVE_ALBUMS, payload: arg });
    });
  });

  ipcRenderer.on(RECEIVE_SONGS, (event, arg) => {
    store.dispatch(dispatch => {
      dispatch({ type: RECEIVE_SONGS, payload: arg });
    });
  });

  ipcRenderer.on(RECEIVE_SONG, (event, arg) => {
    store.dispatch(dispatch => {
      dispatch({ type: RECEIVE_SONG, payload: arg });
    });
  });

  ipcRenderer.on(RECEIVE_ROOT_FOLDER, (event, arg) => {
    store.dispatch(dispatch => {
      dispatch({ type: RECEIVE_ROOT_FOLDER, payload: arg });
    });
  });

  ipcRenderer.on(RECEIVE_LABEL_SIZE, (event, arg) => {
    store.dispatch(dispatch => {
      dispatch({ type: RECEIVE_LABEL_SIZE, payload: arg });
    });
  });

  ipcRenderer.on(RECEIVE_ALBUM_SIZE, (event, arg) => {
    store.dispatch(dispatch => {
      dispatch({ type: RECEIVE_ALBUM_SIZE, payload: arg });
    });
  });

  ipcRenderer.on(RECEIVE_SONG_SIZE, (event, arg) => {
    store.dispatch(dispatch => {
      dispatch({ type: RECEIVE_SONG_SIZE, payload: arg });
    });
  });
};
