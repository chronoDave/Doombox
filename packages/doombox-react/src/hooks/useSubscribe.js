import { useState, useEffect } from 'react';

// Types
import {
  createType,
  PENDING,
  ERROR,
  SUCCESS,
  READ,
  MESSAGE,
  IMAGE
} from '@doombox/utils/types/ipc';

export const useMessage = () => {
  const { ipcRenderer } = window.require('electron');
  const [message, setMessage] = useState({});

  useEffect(() => {
    ipcRenderer.on(MESSAGE, (event, payload) => {
      setMessage(payload);
    });

    // Cleanup
    return () => {
      ipcRenderer.removeAllListeners([MESSAGE]);
    };
  }, []);

  return message;
};
