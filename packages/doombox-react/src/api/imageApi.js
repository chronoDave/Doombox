// Types
import {
  createType,
  IMAGE,
  PENDING,
  READ
} from '@doombox/utils/types/ipc';

const { ipcRenderer } = window.require('electron');

export const fetchImage = id => {
  ipcRenderer.send(createType([PENDING, READ, IMAGE]), id);
};
