import { useState, useEffect } from 'react';

// Types
import { MESSAGE } from '@doombox/utils/types';

const { ipcRenderer } = window.require('electron');

export const useSubscribeMessage = () => {
  const [message, setMessage] = useState({ current: null, total: null });

  useEffect(() => {
    ipcRenderer.on(MESSAGE, (event, payload) => setMessage(payload));

    return () => ipcRenderer.removeAllListeners([MESSAGE]);
  });

  return message;
};
