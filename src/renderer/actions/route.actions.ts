import type * as Route from '../types/route';

import produce from 'immer';

import store from '../store';

export const setRouteApp = (route: Route.App) => store.dispatch(produce(draft => {
  draft.app.route = route;
}), 'app.route');
