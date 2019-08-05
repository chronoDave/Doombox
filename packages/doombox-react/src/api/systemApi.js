// Types
import {
  create,
  CONNECTION_CACHE
} from '@doombox/utils/types';
import {
  PENDING
} from '@doombox/utils/types/asyncTypes';
import {
  READ
} from '@doombox/utils/types/crudTypes';

const { ipcRenderer } = window.require('electron');

export const getCachedConnection = () => dispatch => {
  const actionType = create([PENDING, READ, CONNECTION_CACHE]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType);
};
