import { ipcRenderer } from 'electron';

import { useEffect } from 'react';

// Actions
import { ipcFind } from '../actions';

export default (channel, query, fn) => {
  useEffect(() => {
    ipcRenderer.on(channel, (event, payload) => fn(payload));

    return () => ipcRenderer.removeAllListeners(channel);
  }, [channel, fn]);

  useEffect(() => {
    ipcFind(channel, query);
  }, [channel, query]);
};
