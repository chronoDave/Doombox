// Types
import {
  create,
  IMAGE,
  PENDING,
  READ
} from '@doombox/utils/types';

const { ipcRenderer } = window.require('electron');

export const fetchImage = id => {
  ipcRenderer.send(create([PENDING, READ, IMAGE]), id);
};
