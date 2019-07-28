import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Types
import {
  CREATE_CONNECTION,
  UPDATE_CONNECTION,
  GET_CONNECTION,
  GET_CONNECTION_CACHE
} from '@doombox/utils/types/systemTypes';
import {
  asyncActionPending,
  asyncActionSuccess,
  asyncActionError
} from '@doombox/utils/types/asyncTypes';

const { ipcRenderer } = window.require('electron');

export const useSubscribeSystem = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on(asyncActionSuccess(CREATE_CONNECTION), () => {
      dispatch({ type: asyncActionSuccess(CREATE_CONNECTION) });
    });
    ipcRenderer.on(asyncActionError(CREATE_CONNECTION), (event, payload) => {
      dispatch({ type: asyncActionError(CREATE_CONNECTION), payload });
    });
    ipcRenderer.on(asyncActionSuccess(GET_CONNECTION_CACHE), () => {
      dispatch({ type: asyncActionSuccess(GET_CONNECTION_CACHE) });
    });
    ipcRenderer.on(asyncActionError(GET_CONNECTION_CACHE), () => {
      dispatch({ type: asyncActionError(GET_CONNECTION_CACHE) });
    });
    ipcRenderer.on(asyncActionSuccess(UPDATE_CONNECTION), (event, payload) => {
      dispatch({ type: asyncActionSuccess(UPDATE_CONNECTION), payload });
    });
    ipcRenderer.on(asyncActionError(UPDATE_CONNECTION), (event, payload) => {
      dispatch({ type: asyncActionError(UPDATE_CONNECTION), payload });
    });
    ipcRenderer.on(asyncActionError(GET_CONNECTION), (event, payload) => {
      dispatch({ type: asyncActionError(GET_CONNECTION), payload });
    });

    ipcRenderer.send(asyncActionPending(GET_CONNECTION_CACHE));
    dispatch({ type: asyncActionPending(GET_CONNECTION_CACHE) });

    // Cleanup
    return () => {
      ipcRenderer.removeAllListeners([
        asyncActionSuccess(CREATE_CONNECTION),
        asyncActionError(CREATE_CONNECTION),
        asyncActionSuccess(GET_CONNECTION_CACHE),
        asyncActionError(GET_CONNECTION_CACHE),
        asyncActionSuccess(UPDATE_CONNECTION),
        asyncActionError(UPDATE_CONNECTION),
        asyncActionError(GET_CONNECTION)
      ]);
    };
  }, []);
};
