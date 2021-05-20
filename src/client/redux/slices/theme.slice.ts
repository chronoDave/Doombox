import { UserTheme } from '@doombox-types';

import { createReduxSlice } from '../utils';

const initialState: UserTheme = {
  dark: false
};

const { actions, ...rest } = createReduxSlice('userTheme', {
  setDark: (draft, payload) => { draft.dark = payload; }
}, initialState);

export default actions;
export const { reducer, name } = rest;
