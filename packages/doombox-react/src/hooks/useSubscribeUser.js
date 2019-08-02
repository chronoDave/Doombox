import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Types
import {
  USER,
  USER_CACHE
} from '@doombox/utils/types';
import {
  actionError,
  actionSuccess
} from '@doombox/utils/types/asyncTypes';
import {
  actionCreate,
  actionRead,
  actionUpdate,
  actionDelete
} from '@doombox/utils/types/crudTypes';

// Language
import i18n from '../locale';

const { ipcRenderer } = window.require('electron');

export const useSubscribeUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on(
      actionError(actionCreate(USER)),
      (event, payload) => dispatch({
        type: actionError(actionCreate(USER)),
        payload
      })
    );
    ipcRenderer.on(
      actionSuccess(actionCreate(USER)),
      (event, payload) => dispatch({
        type: actionSuccess(actionCreate(USER)),
        payload
      })
    );
    ipcRenderer.on(
      actionSuccess(actionRead(USER_CACHE)),
      (event, payload) => {
        i18n.changeLanguage(payload.language);
        dispatch({
          type: actionSuccess(actionRead(USER_CACHE)),
          payload
        });
      }
    );
    ipcRenderer.on(
      actionError(actionDelete(USER)),
      (event, payload) => dispatch({
        type: actionError(actionDelete(USER)),
        payload
      })
    );
    ipcRenderer.on(
      actionSuccess(actionDelete(USER)),
      () => dispatch({ type: actionSuccess(actionDelete(USER)) })
    );
    ipcRenderer.on(
      actionError(actionUpdate(USER)),
      (event, payload) => dispatch({
        type: actionError(actionUpdate(USER)),
        payload
      })
    );
    ipcRenderer.on(
      actionSuccess(actionUpdate(USER)),
      (event, payload) => {
        i18n.changeLanguage(payload.language);
        dispatch({
          type: actionSuccess(actionUpdate(USER)),
          payload
        });
      }
    );

    // Cleanup
    return () => {
      ipcRenderer.removeAllListeners([
        actionError(actionCreate(USER)),
        actionSuccess(actionCreate(USER)),
        actionSuccess(actionRead(USER_CACHE)),
        actionError(actionDelete(USER)),
        actionSuccess(actionDelete(USER)),
        actionError(actionUpdate(USER)),
        actionSuccess(actionUpdate(USER))
      ]);
    };
  }, []);
};
