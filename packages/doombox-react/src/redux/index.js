import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';

// Slices
import {
  ipcSlice,
  audioSlice
} from './slices';

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

export const {
  setMetadata,
  setPlayer,
  setPlaylist,
  setVolume,
  setPosition
} = audioSlice.actions;

export const store = createStore(
  combineReducers({
    [ipcSlice.name]: ipcSlice.reducer,
    [audioSlice.name]: audioSlice.reducer
  }),
  applyMiddleware(...middleware)
);
