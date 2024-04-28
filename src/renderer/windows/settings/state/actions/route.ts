import type { Route } from '../state';

import produce from 'immer';

import store from '../store';

export const set = (route: Route) => store.dispatch(produce(draft => {
  draft.route = route;
}), 'route.set');
