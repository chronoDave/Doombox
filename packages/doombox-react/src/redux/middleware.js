/* eslint-disable no-console */
export const logger = store => next => action => {
  const prev = store.getState();
  const result = next(action);

  if (
    process.env.NODE_ENV !== 'development' ||
    action.type === 'SET_POSITION'
  ) return result;

  console.group(`[${new Date().toLocaleTimeString()}] Middleware - Logger`);
  console.info('Previous', prev);
  console.info('Dispatch', action);
  console.info('Current', store.getState());
  console.groupEnd();

  return result;
};
