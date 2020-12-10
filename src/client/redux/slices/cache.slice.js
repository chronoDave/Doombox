import { CACHE } from '@doombox-config';

import { createReduxSlice } from '../utils';

const reducers = {
  setCache: (state, payload) => ({ ...state, ...payload })
};

export default createReduxSlice('cache', CACHE, reducers);
