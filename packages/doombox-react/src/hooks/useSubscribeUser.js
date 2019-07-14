import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Types
import {
  DELETE_USER,
  UPDATE_USER,
  GET_USER_CACHE,
  CREATE_USER
} from '@doombox/utils/types/userTypes';
import {
  asyncActionSuccess,
  asyncActionError
} from '@doombox/utils/types/asyncTypes';

// Language
import i18n from '../locale';

const { ipcRenderer } = window.require('electron');
const changeLanguage = lng => i18n.changeLanguage(lng);

export const useSubscribeUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on(asyncActionSuccess(CREATE_USER), (event, payload) => {
      changeLanguage(payload.language);
      dispatch({ type: asyncActionSuccess(CREATE_USER), payload });
    });
  }, []);

  useEffect(() => {
    ipcRenderer.on(asyncActionError(CREATE_USER), (event, payload) => {
      dispatch({ type: asyncActionError(CREATE_USER), payload });
    });
  }, []);

  useEffect(() => {
    ipcRenderer.on(asyncActionSuccess(GET_USER_CACHE), (event, payload) => {
      changeLanguage(payload.language);
      dispatch({ type: asyncActionSuccess(GET_USER_CACHE), payload });
    });
  }, []);

  useEffect(() => {
    ipcRenderer.on(asyncActionError(GET_USER_CACHE), (event, payload) => {
      dispatch({ type: asyncActionError(GET_USER_CACHE), payload });
    });
  }, []);

  useEffect(() => {
    ipcRenderer.on(asyncActionSuccess(UPDATE_USER), (event, payload) => {
      changeLanguage(payload.language);
      dispatch({ type: asyncActionSuccess(UPDATE_USER), payload });
    });
  }, []);

  useEffect(() => {
    ipcRenderer.on(asyncActionError(UPDATE_USER), (event, payload) => {
      dispatch({ type: asyncActionError(UPDATE_USER), payload });
    });
  }, []);

  useEffect(() => {
    ipcRenderer.on(asyncActionSuccess(DELETE_USER), () => {
      dispatch({ type: asyncActionSuccess(DELETE_USER) });
    });
  }, []);

  useEffect(() => {
    ipcRenderer.on(asyncActionError(DELETE_USER), (event, payload) => {
      dispatch({ type: asyncActionError(DELETE_USER), payload });
    });
  }, []);
};
