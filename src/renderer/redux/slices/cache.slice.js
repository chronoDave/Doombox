import { CACHE } from '@doombox-config';

import { createReduxSlice } from '../utils';

const reducers = {
  setCache: (_, payload) => payload
};

export default createReduxSlice('cache', CACHE, reducers);