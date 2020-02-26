import {
  configureStore,
  combineReducers
} from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

// Slices
import {
  librarySlice,
  playlistSlice,
  configSlice,
  cacheSlice,
  interruptSlice,
  mixographySlice,
  messageSlice,
  labelSlice,
  songSlice
} from './slices';

export const {
  setLibrary,
  setLibraryStatus
} = librarySlice.actions;
export const {
  setPlaylist,
  addPlaylist,
  shufflePlaylist
} = playlistSlice.actions;
export const { setSong } = songSlice.actions;
export const { setConfig } = configSlice.actions;
export const { setCache } = cacheSlice.actions;
export const { setInterrupt } = interruptSlice.actions;
export const { setMessage } = messageSlice.actions;
export const { setMixography } = mixographySlice.actions;
export const { setLabel } = labelSlice.actions;

const middleware = [];

if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger());
}

export const store = configureStore({
  reducer: combineReducers({
    label: labelSlice.reducer,
    library: librarySlice.reducer,
    playlist: playlistSlice.reducer,
    config: configSlice.reducer,
    cache: cacheSlice.reducer,
    interrupt: interruptSlice.reducer,
    message: messageSlice.reducer,
    mixography: mixographySlice.reducer,
    song: songSlice.reducer
  }),
  middleware
});
