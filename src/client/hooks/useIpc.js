import { ipcRenderer } from 'electron';

import { useEffect } from 'react';

// Actions
import { ipcFind } from '../actions';

export default ({
  channel,
  query,
  projection,
  overlay
}, cb) => {
  useEffect(() => {
    ipcRenderer.on(channel, (event, payload) => cb(payload));

    return () => ipcRenderer.removeAllListeners(channel);
  }, [channel, cb]);

  useEffect(() => {
    ipcFind(channel, query, { projection, overlay });
  }, [channel, query, projection, overlay]);
};
