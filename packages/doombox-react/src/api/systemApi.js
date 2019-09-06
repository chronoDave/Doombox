// Types
import {
  createType,
  PENDING,
  READ,
  CACHE
} from '@doombox/utils/types';

const { ipcRenderer } = window.require('electron');

export const getOfflineCache = () => dispatch => {
  const type = createType([PENDING, READ, CACHE]);
  dispatch({ type });
  ipcRenderer.send(type, { offline: true });
};
