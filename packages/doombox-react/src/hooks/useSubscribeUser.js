// Types
import {
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

export const useSubscribeUser = () => {
  createListener([CREATE, USER]);
  createListener([READ, USER_CACHE]);
  createListener([UPDATE, USER]);
  createListener([DELETE, USER]);
};
