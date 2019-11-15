import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { isDev } from '@doombox/utils';

// Reducers
import * as reducers from './reducers';

// Middleware
const middleware = [
  thunkMiddleware,
  isDev ? require('redux-logger').createLogger() : null // eslint-disable-line global-require
].filter(item => item);

export const store = createStore(
  combineReducers({
    system: reducers.systemReducer,
    profile: reducers.profileReducer,
    library: reducers.libraryReducer,
    playlist: reducers.playlistReducer
  }),
  compose(applyMiddleware(...middleware))
);
