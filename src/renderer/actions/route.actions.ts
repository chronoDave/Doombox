import type * as Route from '../types/route';

import produce from 'immer';

import store from '../store';

export const setRouteApp = (route: Route.App) => store.dispatch(produce(draft => {
  draft.route.app = route;
}), 'route.app');

export const setRouteSearch = (route: Route.Search) => store.dispatch(produce(draft => {
  draft.route.search = route;
}), 'route.search');

export const setRouteHome = (route: Route.Home) => store.dispatch(produce(draft => {
  draft.route.home = route;
}), 'route.home');

export const setRouteSettings = (route: Route.Settings | null) => store.dispatch(produce(draft => {
  draft.route.settings = route;
}), 'route.settings');
