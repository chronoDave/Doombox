/* eslint-disable no-console */
export const logger = store => next => action => {
  const prev = store.getState();
  const result = next(action);

  console.group(`[${new Date().toLocaleTimeString()}] Middleware - Logger`);
  console.info('Previous', prev);
  console.info('Dispatch', action);
  console.info('Current', store.getState());
  console.groupEnd();

  return result;
};
