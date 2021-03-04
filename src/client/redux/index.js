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
  populateLibrary,
  populateLibraryMenu,
  populatePlaylists
} from './selectors';

// Actions
export const {
  setQuery,
  setSongs,
  setAlbums,
  setLabels
} = searchSlice.actions;
export const { setConfig } = configSlice.actions;
export const { setCache } = cacheSlice.actions;
export const {
  setOverlay,
  setView
} = windowSlice.actions;
export const {
  setSliding,
  setPlayer,
  setMetadata,
  setStatus,
  setAutoplay,
  setMuted,
  setVolume,
  setPosition
} = playerSlice.actions;
export const {
  setPlaylist,
  setPlaylistIndex
} = playlistSlice.actions;
export const {
  setImages,
  setPlaylists,
  setLibrary
} = entitySlice.actions;

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
