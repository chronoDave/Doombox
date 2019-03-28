import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Reducers
import { databaseReducer } from './databaseReducer';
import { songReducer } from './songReducer';
import { windowReducer } from './windowReducer';
import { playlistReducer } from './playlistReducer';

export const rootReducer = combineReducers({
  list: databaseReducer,
  song: songReducer,
  window: windowReducer,
  playlist: playlistReducer,
  form: formReducer
});
