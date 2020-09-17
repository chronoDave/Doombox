import { CONFIG, createReduxSlice } from '@doombox/utils';

const reducers = {
  setConfig: (state, payload) => ({ ...state, ...payload })
};

export const configSlice = createReduxSlice('config', CONFIG, reducers);
