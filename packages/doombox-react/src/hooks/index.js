// General
import {
  useState,
  useEffect
} from 'react';

// Electron
const { ipcRenderer } = window.require('electron');

export const useIpc = type => {
  const [data, setPayload] = useState({});

  useEffect(() => {
    ipcRenderer.on(type, (event, payload) => {
      setPayload(payload);
    });

    // Cleanup
    return () => {
      ipcRenderer.removeAllListeners(type);
    };
  }, []);

  return data;
};
