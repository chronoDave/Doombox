import { CACHE } from '../../../../doombox-types';
import { createReduxSlice } from '../../../../doombox-utils';

const reducers = {
  setCache: (state, payload) => ({ ...state, ...payload })
};

export const cacheSlice = createReduxSlice('cache', CACHE, reducers);
