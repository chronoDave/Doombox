export const logger = store => next => action => {
  if (process.env.NODE_ENV === 'development') {
    console.log('---------------');
    console.log('Old state', store.getState());
    console.log('Dispatch', action);
    const result = next(action);
    console.log('New state', store.getState());
    return result;
  }
  return next(action);
};
