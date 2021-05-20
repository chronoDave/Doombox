import { Middleware } from 'redux';
import { getTimestampMs } from '@doombox-utils';

export const logger: Middleware = store => next => action => {
  if (process.env.NODE_ENV !== 'development') return next(action);

  const prevState = store.getState();
  const newState = next(action);

  console.group(`[${getTimestampMs()}] ${action.type}`);
  console.info('Previous', prevState);
  console.info('Action', action);
  console.info('Current', store.getState());
  console.groupEnd();

  return newState;
};
