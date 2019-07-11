import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Types
import {
  GET_USER,
  CREATE_USER
} from '@doombox/utils/types/userTypes';
import {
  asyncActionSuccess,
  asyncActionError
} from '@doombox/utils/types/asyncTypes';

const { ipcRenderer } = window.require('electron');

export const useSubscribeUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on(asyncActionSuccess(GET_USER), (event, payload) => {
      dispatch({ type: asyncActionSuccess(GET_USER), payload });
    });
  }, []);

  useEffect(() => {
    ipcRenderer.on(asyncActionError(GET_USER), (event, payload) => {
      dispatch({ type: asyncActionError(GET_USER), payload });
    });
  }, []);

  useEffect(() => {
    ipcRenderer.on(asyncActionSuccess(CREATE_USER), (event, payload) => {
      dispatch({ type: asyncActionSuccess(CREATE_USER), payload });
    });
  }, []);

  useEffect(() => {
    ipcRenderer.on(asyncActionError(CREATE_USER), (event, payload) => {
      dispatch({ type: asyncActionError(CREATE_USER), payload });
    });
  }, []);
};
