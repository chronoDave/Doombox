import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Types
import { create } from '@doombox/utils/types';
import { ERROR, SUCCESS } from '@doombox/utils/types/asyncTypes';

const {
  ipcRenderer,
  remote: { dialog: { showOpenDialog } }
} = window.require('electron');

// General
export const isEmptyObj = obj => Object.keys(obj).length === 0;
export const normalizeUrl = url => url
  .replace(/#/g, '%23')
  .replace(/\\/g, '\\\\');
export const getRandomInt = (min, max) => (
  Math.floor(Math.random() * (max - min + 1) + min)
);

// Locale
export const languages = ['en-US', 'en-GB', 'nl', 'ar-SA'];

// Electron
export const selectFolder = multi => {
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
 * Create an IPC success / error listener
 *
 * @param {string[]} type - Type array
 */
export const createListener = type => {
  const dispatch = useDispatch();

  const errorType = create([ERROR, create(type)]);
  const successType = create([SUCCESS, create(type)]);

  useEffect(() => {
    ipcRenderer.on(
      errorType,
      (event, err) => dispatch({ type: errorType, err })
    );
    ipcRenderer.on(
      successType,
      (event, payload) => dispatch({ type: successType, payload })
    );

    // Cleanup
    return () => {
      ipcRenderer.removeAllListeners([errorType, successType]);
    };
  }, []);
};
