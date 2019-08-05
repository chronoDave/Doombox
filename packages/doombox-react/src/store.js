import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { isDev } from '@doombox/utils';

// Reducers
import {
  profileReducer,
  systemReducer,
  libraryReducer
} from './reducers';

// Middleware
const middleware = [
  thunkMiddleware,
  isDev() ? require('redux-logger').createLogger() : null // eslint-disable-line global-require
].filter(item => item);

export const store = createStore(
  combineReducers({
    profile: profileReducer,
    system: systemReducer,
    library: libraryReducer
  }),
  compose(applyMiddleware(...middleware))
);
