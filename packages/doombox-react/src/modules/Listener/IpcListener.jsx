import {
  CREATE,
  READ,
  UPDATE,
  DELETE,
  CACHE,
  USER,
  LIBRARY
} from '@doombox/utils/types';

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

const IpcListener = ({ children }) => {
  subscribeSystem();
  subscribeUser();
  subscribeLibrary();

  return children;
};

export default IpcListener;
