// Types
import { LIBRARY } from '@doombox/utils/types';
import { CREATE, READ } from '@doombox/utils/types/crudTypes';

// Utils
import { createListener } from '../utils';

export const useSubscribeLibrary = () => {
  createListener([CREATE, LIBRARY]);
  createListener([READ, LIBRARY]);
};
