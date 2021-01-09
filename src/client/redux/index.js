import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';

// Slices
import {
  configSlice,
  cacheSlice,
  playerSlice,
  playlistSlice,
  entitySlice,
  windowSlice,
  searchSlice
} from './slices';

// Middleware
import { logger } from './middleware';

// Selectors
export {
  populateSearchLabels,
  populateSearchAlbums,
  populateSearchSongs,
  populateLibrary
} from './selectors';

// Actions
export const {
  setQuery,
  setSongs,
  setAlbums,
  setLabels
} = searchSlice.actions;
export const { setConfig } = configSlice.actions;
export const {
  setCache,
  setTab
} = cacheSlice.actions;
export const {
  setOverlay,
  setView
} = windowSlice.actions;
export const {
  setPlayer,
  setMetadata,
  setStatus,
  setAutoplay,
  setDuration,
  setMuted,
  setVolume,
  setPosition
} = playerSlice.actions;
export const {
  setPlaylist,
  setPlaylistIndex
} = playlistSlice.actions;
export const { setImages, setLibrary } = entitySlice.actions;

export const store = createStore(
  combineReducers({
    [cacheSlice.name]: cacheSlice.reducer,
    [configSlice.name]: configSlice.reducer,
    [playerSlice.name]: playerSlice.reducer,
    [playlistSlice.name]: playlistSlice.reducer,
    [entitySlice.name]: entitySlice.reducer,
    [windowSlice.name]: windowSlice.reducer,
    [searchSlice.name]: searchSlice.reducer
  }),
  applyMiddleware(logger)
);
