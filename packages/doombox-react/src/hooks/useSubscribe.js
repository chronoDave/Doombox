import { useState, useEffect } from 'react';

// Types
import {
  LIBRARY,
  MESSAGE,
  CONNECTION_CACHE,
  USER,
  USER_CACHE
} from '@doombox/utils/types';
import {
  CREATE,
  READ,
  UPDATE,
  DELETE
} from '@doombox/utils/types/crudTypes';

// Utils
import { createListener } from '../utils';

// Api
import { fetchLibrary } from '../api/libraryApi';
import { getCachedProfile } from '../api/userApi';

const { ipcRenderer } = window.require('electron');

export const useSubscribeLibrary = () => {
  useEffect(() => {
    fetchLibrary();
  }, []);

  createListener([CREATE, LIBRARY]);
  createListener([READ, LIBRARY]);
};

export const useSubscribeMessage = () => {
  const [message, setMessage] = useState({ current: null, total: null });

  useEffect(() => {
    ipcRenderer.on(MESSAGE, (event, payload) => setMessage(payload));

    return () => ipcRenderer.removeAllListeners([MESSAGE]);
  });

  return message;
};

export const useSubscribeSystem = () => {
  createListener([READ, CONNECTION_CACHE]);
};

export const useSubscribeUser = () => {
  useEffect(() => {
    getCachedProfile();
  }, []);

  createListener([CREATE, USER]);
  createListener([READ, USER_CACHE]);
  createListener([UPDATE, USER]);
  createListener([DELETE, USER]);
};
