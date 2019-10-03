import { useState, useEffect } from 'react';

// Types
import {
  USER,
  CREATE,
  REMOTE,
  UPDATE,
  READ,
  DELETE,
  CACHE,
  CONNECTION,
  LIBRARY,
  COLLECTION,
  MESSAGE
} from '@doombox/utils/types';

// Utils
import { createListener } from '../utils';

export const useSubscribeUser = () => {
  createListener([CREATE, USER]);
  createListener([READ, USER]);
  createListener([READ, REMOTE]);
  createListener([UPDATE, USER]);
  createListener([DELETE, USER]);
};

export const useSubscribeSystem = () => {
  createListener([READ, CACHE], true);
  createListener([DELETE, CACHE]);
  createListener([READ, CONNECTION]);
  createListener([READ, REMOTE]);
  createListener([DELETE, USER]);
  createListener([READ, USER]);
};

export const useSubscribeLibrary = () => {
  createListener([CREATE, LIBRARY]);
  createListener([READ, LIBRARY], true);
  createListener([READ, COLLECTION]);
};

export const useSubscribeMessage = () => {
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
