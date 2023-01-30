import store from '../store';

export const setCurrent = (current: { id: string, duration: number }) =>
  store.dispatch('setCurrent', current);
