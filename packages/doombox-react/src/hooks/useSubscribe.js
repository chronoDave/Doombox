import { useState, useEffect } from 'react';

// Types
import { MESSAGE } from '@doombox/utils/types';

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
