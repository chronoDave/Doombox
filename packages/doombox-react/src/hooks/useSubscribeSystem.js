import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Types
import {
  CONNECTION_CACHE
} from '@doombox/utils/types';
import {
  actionError,
  actionSuccess
} from '@doombox/utils/types/asyncTypes';
import {
  actionRead
} from '@doombox/utils/types/crudTypes';

// Actions
import { getCachedConnection } from '../api/systemApi';

const { ipcRenderer } = window.require('electron');

export const useSubscribeSystem = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on(
      actionError(actionRead(CONNECTION_CACHE)),
      () => dispatch({ type: actionError(actionRead(CONNECTION_CACHE)) })
    );
    ipcRenderer.on(
      actionSuccess(actionRead(CONNECTION_CACHE)),
      () => dispatch({ type: actionSuccess(actionRead(CONNECTION_CACHE)) })
    );

    // Initialize
    dispatch(getCachedConnection());

    // Cleanup
    return () => {
      ipcRenderer.removeAllListeners([
        actionError(actionRead(CONNECTION_CACHE)),
        actionSuccess(actionRead(CONNECTION_CACHE))
      ]);
    };
  }, []);
};
