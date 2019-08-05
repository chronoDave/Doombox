import { useDispatch } from 'react-redux';

// Types
import { CONNECTION_CACHE } from '@doombox/utils/types';
import { READ } from '@doombox/utils/types/crudTypes';

// Actions
import { getCachedConnection } from '../api/systemApi';

// Utils
import { createListener } from '../utils';

export const useSubscribeSystem = () => {
  const dispatch = useDispatch();

  createListener([READ, CONNECTION_CACHE]);

  dispatch(getCachedConnection());
};
