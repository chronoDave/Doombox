import {
  UPDATE_DATABASE,
  DELETE_DATABASE,
  SET_DATABASE_UPDATED
} from '../actionTypes/databaseTypes';

// eslint-disable-next-line no-undef
const { ipcRenderer } = window.require('electron');

// Fetch
export const updateDatabase = () => ipcRenderer.send(UPDATE_DATABASE);

export const deleteDatabase = () => dispatch => {
  dispatch({ type: DELETE_DATABASE });
  ipcRenderer.send(DELETE_DATABASE);
};

export const setDatabaseCreated = payload => dispatch => dispatch({
  type: SET_DATABASE_UPDATED,
  payload
});
