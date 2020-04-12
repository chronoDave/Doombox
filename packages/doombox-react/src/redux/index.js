import {
  configureStore,
  combineReducers
} from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

// Slices
import {
  librarySlice,
  mixtapeSlice,
  playlistSlice,
  configSlice,
  cacheSlice,
  interruptSlice,
  mixographySlice,
  messageSlice
} from './slices';

export const { setLibrary } = librarySlice.actions;
export const {
  setMixtape,
  addMixtape
} = mixtapeSlice.actions;
export const { setPlaylist } = playlistSlice.actions;
export const { setConfig } = configSlice.actions;
export const { setCache } = cacheSlice.actions;
export const { setInterrupt } = interruptSlice.actions;
export const { setMessage } = messageSlice.actions;
export const { setMixography } = mixographySlice.actions;

const middleware = [];

if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger());
}

export const store = configureStore({
  reducer: combineReducers({
    library: librarySlice.reducer,
    playlist: playlistSlice.reducer,
    mixtape: mixtapeSlice.reducer,
    config: configSlice.reducer,
    cache: cacheSlice.reducer,
    interrupt: interruptSlice.reducer,
    message: messageSlice.reducer,
    mixography: mixographySlice.reducer
  }),
  middleware
});
