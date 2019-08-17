// Types
import {
  create,
  IMAGE
} from '@doombox/utils/types';
import { PENDING } from '@doombox/utils/types/asyncTypes';
import { READ } from '@doombox/utils/types/crudTypes';

const { ipcRenderer } = window.require('electron');

export const fetchImage = id => {
  ipcRenderer.send(create([PENDING, READ, IMAGE]), id);
};
