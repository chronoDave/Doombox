import {
  CREATE_USER
} from '../../../../utils/types/create';

const { ipcRenderer } = window.require('electron');

export const createUser = payload => {
  ipcRenderer.send(CREATE_USER, payload);
};
