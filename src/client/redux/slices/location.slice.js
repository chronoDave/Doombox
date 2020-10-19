import { VIEWS } from '@doombox-utils/types';

import { createReduxSlice } from '../utils';

const initialState = {
  view: VIEWS.ALBUM,
  dialog: null
};

const reducers = {
  setView: (state, view) => ({ ...state, view }),
  setDialog: (state, dialog) => ({ ...state, dialog })
};

export const locationSlice = createReduxSlice('location', initialState, reducers);
