import {
  THEME,
  CONFIG,
  CACHE
} from '@doombox/utils';

import { IPC } from '../types';

const initialState = {
  cache: CACHE,
  config: CONFIG,
  theme: THEME
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case IPC.SET_CACHE:
      return ({
        ...state,
        cache: {
          ...state.cache,
          ...action.payload
        }
      });
    case IPC.SET_CONFIG:
      return ({
        ...state,
        config: {
          ...state.config,
          ...action.payload
        }
      });
    case IPC.SET_THEME:
      return ({
        ...state,
        theme: {
          ...state.theme,
          ...action.payload
        }
      });
    default:
      return state;
  }
};

const actions = {
  setCache: cache => ({
    type: IPC.SET_CACHE,
    payload: cache
  }),
  setConfig: config => ({
    type: IPC.SET_CONFIG,
    payload: config
  }),
  setTheme: theme => ({
    type: IPC.SET_THEME,
    payload: theme
  })
};

export const ipcSlice = {
  name: 'ipc',
  reducer,
  actions
};