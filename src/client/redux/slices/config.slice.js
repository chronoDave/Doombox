import { CONFIG } from '@doombox-config';

import { createReduxSlice } from '../utils';

const reducers = {
  setConfig: (state, payload) => ({ ...state, ...payload })
};

export const configSlice = createReduxSlice('config', CONFIG, reducers);
