import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';

// Slices
import { ipcSlice } from './slices';

// Middleware
import { logger } from './middleware';

const middleware = [];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

export const {
  setCache,
  setConfig,
  setTheme
} = ipcSlice.actions;

export const store = createStore(
  combineReducers({
    [ipcSlice.name]: ipcSlice.reducer
  }),
  applyMiddleware(...middleware)
);
