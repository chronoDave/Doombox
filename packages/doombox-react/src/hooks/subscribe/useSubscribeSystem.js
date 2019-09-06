// Types
import {
  REMOTE,
  DELETE,
  CACHE,
  CONNECTION,
  USER,
  READ
} from '@doombox/utils/types';

// Utils
import { createListener } from '../../utils';

export const useSubscribeSystem = () => {
  createListener([READ, CACHE], true);
  createListener([DELETE, CACHE]);
  createListener([READ, CONNECTION]);
  createListener([READ, REMOTE]);
  createListener([DELETE, USER]);
  createListener([READ, USER]);
};
