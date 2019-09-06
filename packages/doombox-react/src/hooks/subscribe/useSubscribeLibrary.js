// Types
import {
  LIBRARY,
  CREATE,
  READ,
} from '@doombox/utils/types';

// Utils
import { createListener } from '../../utils';

export const useSubscribeLibrary = () => {
  createListener([CREATE, LIBRARY]);
  createListener([READ, LIBRARY], true);
};
