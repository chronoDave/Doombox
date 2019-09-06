// Types
import {
  USER,
  CREATE,
  REMOTE,
  UPDATE,
  READ,
  DELETE
} from '@doombox/utils/types';

// Utils
import { createListener } from '../../utils';

export const useSubscribeUser = () => {
  createListener([CREATE, USER]);
  createListener([READ, USER]);
  createListener([READ, REMOTE]);
  createListener([UPDATE, USER]);
  createListener([DELETE, USER]);
};
