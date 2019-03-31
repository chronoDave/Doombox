import {
  FETCH_LABEL_LIST,
  FETCH_ALBUM_LIST,
  FETCH_SONG_LIST,
  FETCH_ALBUMS,
  FETCH_SONGS,
  FETCH_SONG,
  UPDATE_DATABASE,
  FETCH_LABEL_SIZE,
  FETCH_ALBUM_SIZE,
  FETCH_SONG_SIZE
} from '../actionTypes/databaseTypes';

// eslint-disable-next-line no-undef
const { ipcRenderer } = window.require('electron');

export const fetchLabelList = () => dispatch => {
  dispatch({ type: FETCH_LABEL_LIST });
  ipcRenderer.send(FETCH_LABEL_LIST);
};

export const fetchAlbumList = () => dispatch => {
  dispatch({ type: FETCH_ALBUM_LIST });
  ipcRenderer.send(FETCH_ALBUM_LIST);
};

export const fetchSongList = () => dispatch => {
  dispatch({ type: FETCH_SONG_LIST });
  ipcRenderer.send(FETCH_SONG_LIST);
};

export const fetchAlbums = id => dispatch => {
  dispatch({ type: FETCH_ALBUMS });
  ipcRenderer.send(FETCH_ALBUMS, id);
};

export const fetchSongs = id => dispatch => {
  dispatch({ type: FETCH_SONGS });
  ipcRenderer.send(FETCH_SONGS, id);
};

export const fetchSong = id => dispatch => {
  dispatch({ type: FETCH_SONG });
  ipcRenderer.send(FETCH_SONG, id);
};

export const fetchLabelSize = () => dispatch => {
  dispatch({ type: FETCH_LABEL_SIZE });
  ipcRenderer.send(FETCH_LABEL_SIZE);
};

export const fetchAlbumSize = () => dispatch => {
  dispatch({ type: FETCH_ALBUM_SIZE });
  ipcRenderer.send(FETCH_ALBUM_SIZE);
};

export const fetchSongSize = () => dispatch => {
  dispatch({ type: FETCH_SONG_SIZE });
  ipcRenderer.send(FETCH_SONG_SIZE);
};

export const updateDatabase = () => ipcRenderer.send(UPDATE_DATABASE);
