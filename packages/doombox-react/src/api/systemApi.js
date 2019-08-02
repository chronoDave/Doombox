// Types
import {
  CONNECTION_CACHE
} from '@doombox/utils/types';
import {
  actionPending
} from '@doombox/utils/types/asyncTypes';
import {
  actionRead
} from '@doombox/utils/types/crudTypes';

const { ipcRenderer } = window.require('electron');

export const getCachedConnection = () => dispatch => {
  const actionType = actionPending(actionRead(CONNECTION_CACHE));
  dispatch({ type: actionType });

  ipcRenderer.send(actionType);
};
