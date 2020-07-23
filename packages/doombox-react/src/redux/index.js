import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';

// Slices
import {
  audioSlice,
  errorSlice,
  ipcSlice
} from './slices';

// Middleware
import { logger } from './middleware';

export const {
  setSong,
  setPlayer,
  setPlaylist,
  setVolume,
  setPosition
} = audioSlice.actions;

export const {
  setError
} = errorSlice.actions;

export const {
  setCache,
  setConfig,
  setTheme
} = ipcSlice.actions;

export const store = createStore(
  combineReducers({
    [audioSlice.name]: audioSlice.reducer,
    [errorSlice.name]: errorSlice.reducer,
    [ipcSlice.name]: ipcSlice.reducer
  }),
  applyMiddleware(logger)
);
