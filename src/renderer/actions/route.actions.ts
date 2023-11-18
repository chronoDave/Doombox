import type { Route } from '../types/state';

import produce from 'immer';

import store from '../store';

export const setRoute = (route: Route) => store.dispatch(produce(draft => {
  draft.app.route = route;
}), 'app.route');
