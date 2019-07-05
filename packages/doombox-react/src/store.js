import { createStore, compose, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

// Reducers
import { rootReducer } from './reducers';

// Utils
import { isDev } from './utils';

const middleware = [thunkMiddleware];
if (isDev()) {
  middleware.push(logger);
}

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middleware))
);
