import {
  DELETE_USER
} from '@doombox/utils/types/delete';

const { ipcRenderer } = window.require('electron');

export const deleteUser = () => {
  ipcRenderer.send(DELETE_USER);
};
