// Types
import { CREATE_IMAGE } from '@doombox/utils/types/imageTypes';
import {
  asyncActionPending,
  asyncActionSuccess,
  asyncActionError
} from '@doombox/utils/types/asyncTypes';

const { ipcRenderer } = window.require('electron');

export const createImage = image => {
  ipcRenderer.send(asyncActionPending(CREATE_IMAGE), image);

  return new Promise((resolve, reject) => {
    ipcRenderer.on(asyncActionSuccess(CREATE_IMAGE), (event, payload) => {
      resolve(payload);
    });
    ipcRenderer.on(asyncActionError(CREATE_IMAGE), (event, err) => {
      reject(err);
    });
  });
};
