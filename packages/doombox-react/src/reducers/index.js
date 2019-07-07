import { combineReducers } from 'redux';

// Reducers
import { systemReducer } from './systemReducer';

export const rootReducer = combineReducers({
  system: systemReducer
});
