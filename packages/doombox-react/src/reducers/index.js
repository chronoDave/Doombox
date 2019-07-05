import { combineReducers } from 'redux';

// Reducers
import { userReducer } from './userReducer';
import { systemReducer } from './systemReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  system: systemReducer
});
