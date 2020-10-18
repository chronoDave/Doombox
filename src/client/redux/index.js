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
  locationSlice
} from './slices';

// Middleware
import { logger } from './middleware';

// Actions
export const { setConfig } = configSlice.actions;
export const { setCache } = cacheSlice.actions;
export const { setRoute, setDialog } = locationSlice.actions;
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
  setName,
  setCover,
  setCollection
} = playlistSlice.actions;
export const {
  setImages,
  setSongs,
  setAlbums,
  setLabels
} = entitySlice.actions;

export const store = createStore(
  combineReducers({
    [cacheSlice.name]: cacheSlice.reducer,
    [configSlice.name]: configSlice.reducer,
    [playerSlice.name]: playerSlice.reducer,
    [playlistSlice.name]: playlistSlice.reducer,
    [entitySlice.name]: entitySlice.reducer,
    [locationSlice.name]: locationSlice.reducer
  }),
  applyMiddleware(logger)
);
