import { combineReducers } from 'redux';

// Reducers
import { databaseReducer } from './databaseReducer';
import { songReducer } from './songReducer';
import { windowReducer } from './windowReducer';
import { playlistReducer } from './playlistReducer';
import { systemReducer } from './systemReducer';

export const rootReducer = combineReducers({
  list: databaseReducer,
  song: songReducer,
  window: windowReducer,
  playlist: playlistReducer,
  system: systemReducer
});
