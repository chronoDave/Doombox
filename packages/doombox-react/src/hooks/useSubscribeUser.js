import { useEffect } from 'react';

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

// Actions
import { getCachedProfile } from '../api/userApi';

export const useSubscribeUser = () => {
  useEffect(() => {
    getCachedProfile();
  }, []);

  createListener([CREATE, USER]);
  createListener([READ, USER_CACHE]);
  createListener([UPDATE, USER]);
  createListener([DELETE, USER]);
};
