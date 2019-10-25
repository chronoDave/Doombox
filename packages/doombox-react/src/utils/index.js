import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import memoize from 'memoize-one';

// Types
import {
  createType,
  PENDING,
  ERROR,
  SUCCESS
} from '@doombox/utils/types';

// General
export const isEmptyObj = obj => Object.keys(obj).length === 0;
export const cleanUrl = url => url
  .replace(/#/g, '%23')
  .replace(/\\/g, '/');
export const getRandomInt = (min, max) => (
  Math.floor(Math.random() * (max - min + 1) + min)
);
export const shuffleArray = array => array
  .map(a => [Math.random(), a])
  .sort((a, b) => a[0] - b[0])
  .map(a => a[1]);
export const formatTime = time => {
  const zeroPadding = i => (i < 10 ? `0${i}` : i);

  const seconds = zeroPadding(Math.floor(time % 60));
  const minutes = zeroPadding(Math.floor((time / 60) % 60));
  const hours = zeroPadding(Math.floor((time / 3600) % 24));

  return `${hours === '00' ? '' : `${hours}:`}${minutes}:${seconds}`;
};
export const localToRemoteUrl = async url => (
  new Promise((resolve, reject) => fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    }))
);
export const memoProps = memoize(props => ({ ...props }));
export const isValidView = (views, view) => Object.values(views).includes(view);

// Locale
export const languages = [
  'en-US',
  'en-GB',
  'nl',
  'ar-SA'
];

// Electron
export const selectFolder = multi => {
  const { remote: { dialog: { showOpenDialog } } } = window.require('electron');
  const properties = ['openDirectory'];
  if (multi) properties.push('multiSelections');

  return new Promise(resolve => {
    showOpenDialog({ properties }, filePaths => {
      if (!filePaths || filePaths.length === 0) {
        resolve(null);
      } else {
        resolve(filePaths[0]);
      }
    });
  });
};

/**
 * IPC listener factory
 * @param {string[]} type - Type array
 * @param {Boolean} dispatchPending - Dispatches pending event when true
 */
export const createListener = (type, dispatchPending) => {
  const { ipcRenderer } = window.require('electron');
  const dispatch = useDispatch();

  const actionType = createType(type);
  const errorType = createType([ERROR, actionType]);
  const successType = createType([SUCCESS, actionType]);

  useEffect(() => {
    ipcRenderer.on(
      errorType,
      (event, payload) => dispatch({ type: errorType, payload })
    );
    ipcRenderer.on(
      successType,
      (event, payload) => dispatch({ type: successType, payload })
    );

    if (dispatchPending) {
      const pendingType = createType([PENDING, actionType]);

      dispatch({ type: pendingType });
      ipcRenderer.send(pendingType);
    }

    // Cleanup
    return () => {
      ipcRenderer.removeAllListeners([errorType, successType]);
    };
  }, []);
};
