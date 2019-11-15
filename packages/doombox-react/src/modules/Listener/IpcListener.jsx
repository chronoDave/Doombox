import {
  CREATE,
  READ,
  UPDATE,
  DELETE,
  CACHE,
  USER,
  LIBRARY,
  PLAYLIST
} from '@doombox/utils/types/ipc';

// Utils
import { createListener } from '../../utils';

const subscribeSystem = () => {
  createListener([READ, CACHE], true);
};

const subscribeUser = () => {
  createListener([CREATE, USER]);
  createListener([READ, USER]);
  createListener([UPDATE, USER]);
  createListener([DELETE, USER]);
};

const subscribeLibrary = () => {
  createListener([CREATE, LIBRARY]);
  createListener([READ, LIBRARY]);
};

const subscribePlaylist = () => {
  createListener([CREATE, PLAYLIST]);
  createListener([READ, PLAYLIST]);
  createListener([UPDATE, PLAYLIST]);
  createListener([DELETE, PLAYLIST]);
};

const IpcListener = ({ children }) => {
  subscribeSystem();
  subscribeUser();
  subscribeLibrary();
  subscribePlaylist();

  return children;
};

export default IpcListener;
