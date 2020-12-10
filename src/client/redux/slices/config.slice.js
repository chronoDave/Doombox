import { CONFIG } from '@doombox-config';

import { createReduxSlice } from '../utils';

const reducers = {
  setConfig: (state, payload) => ({ ...state, ...payload })
};

export default createReduxSlice('config', CONFIG, reducers);
