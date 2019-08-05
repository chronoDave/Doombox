// Types
import { CONNECTION_CACHE } from '@doombox/utils/types';
import { READ } from '@doombox/utils/types/crudTypes';

// Utils
import { createListener } from '../utils';

export const useSubscribeSystem = () => {
  createListener([READ, CONNECTION_CACHE]);
};
