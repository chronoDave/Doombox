import type * as Route from '../types/route';

import produce from 'immer';

import store from '../store';

export const setRouteApp = (route: Route.App) => store.set(produce(draft => {
  draft.route.app = route;
}), 'route.app');

export const setRouteSearch = (route: Route.Search) => store.set(produce(draft => {
  draft.route.search = route;
}), 'route.search');

export const setRouteHome = (route: Route.Home) => store.set(produce(draft => {
  draft.route.home = route;
}), 'route.home');
