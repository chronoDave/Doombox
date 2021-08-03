import { Middleware } from 'redux';

export const logger: Middleware = store => next => action => {
  const prev = store.getState();
  const result = next(action);

  if (process.env.NODE_ENV !== 'development') return result;

  console.group(`[${new Date().toLocaleTimeString()}-${new Date().getMilliseconds()}] ${action.type}`);
  console.info('Previous', prev);
  console.info('Dispatch', action);
  console.info('Current', store.getState());
  console.groupEnd();

  return result;
};
