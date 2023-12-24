import type * as Route from '../types/route';

import produce from 'immer';

import store from '../store';

export const setRouteApp = (route: Route.App) => store.dispatch(produce(draft => {
  draft.route.app = route;
}), 'route.app');

export const setRouteSearch = (route: Route.Search) => store.dispatch(produce(draft => {
  draft.route.search = route;
}), 'route.search');
