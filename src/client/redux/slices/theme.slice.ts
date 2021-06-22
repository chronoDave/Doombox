import theme from '@doombox-theme';

import { createReduxSlice } from '../utils';

const { actions, ...rest } = createReduxSlice('Theme', {
  setDark: (draft, payload) => { draft.dark = payload; }
}, theme);

export default actions;
export const { reducer, name } = rest;
