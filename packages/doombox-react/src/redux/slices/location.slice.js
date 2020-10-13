import { createReduxSlice } from '../../../../doombox-utils';
import { ROUTES } from '../../../../doombox-types';

const initialState = {
  route: ROUTES.MAIN,
  dialog: null
};

const reducers = {
  setRoute: (state, route) => ({ ...state, route }),
  setDialog: (state, dialog) => ({ ...state, dialog })
};

export const locationSlice = createReduxSlice('location', initialState, reducers);
