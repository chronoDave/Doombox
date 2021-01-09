import { CACHE } from '@doombox-config';

import { createReduxSlice } from '../utils';

const reducers = {
  setCache: (state, payload) => ({ ...state, ...payload }),
  setTab: (state, tab) => ({ ...state, tab })
};

export default createReduxSlice('cache', CACHE, reducers);
