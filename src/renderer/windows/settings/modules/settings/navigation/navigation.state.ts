import type { Route } from '../../../state/state';

import produce from 'immer';

import store from '../../../state/store';

export default store.select(state => state.route);

export const setRoute = (route: Route) => store.set(produce(draft => {
  draft.route = route;
}));
