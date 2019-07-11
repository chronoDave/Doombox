import { combineReducers } from 'redux';

// Reducers
import { profileReducer } from './profileReducer';

export const rootReducer = combineReducers({
  profile: profileReducer
});
