import { useEffect } from 'react';

// Types
import { LIBRARY } from '@doombox/utils/types';
import { CREATE, READ } from '@doombox/utils/types/crudTypes';

// Utils
import { createListener } from '../utils';

// Api
import { fetchLibrary } from '../api/libraryApi';

export const useSubscribeLibrary = () => {
  useEffect(() => {
    fetchLibrary();
  }, []);

  createListener([CREATE, LIBRARY]);
  createListener([READ, LIBRARY]);
};
