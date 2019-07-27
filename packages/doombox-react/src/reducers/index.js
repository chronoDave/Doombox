import { combineReducers } from 'redux';

// Reducers
import { profileReducer } from './profileReducer';
import { systemReducer } from './systemReducer';

export const rootReducer = combineReducers({
  profile: profileReducer,
  system: systemReducer
});
