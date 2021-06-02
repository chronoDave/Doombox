import { createReduxSlice } from '../utils';
import { theme } from '../../theme';

const { actions, ...rest } = createReduxSlice('Theme', {
  setDark: (draft, payload) => { draft.dark = payload; }
}, theme);

export default actions;
export const { reducer, name } = rest;
