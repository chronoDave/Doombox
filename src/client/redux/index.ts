import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';

import * as themeSlice from './slices/theme.slice';

import { logger } from './middleware';

export default createStore(
  combineReducers({
    [themeSlice.name]: themeSlice.reducer
  }),
  applyMiddleware(logger)
);

export { default as themeActions } from './slices/theme.slice';
