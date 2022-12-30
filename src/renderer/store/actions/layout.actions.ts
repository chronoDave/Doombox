import type { State } from '../store';

import store from '../store';

export const setLayout = (layout: State['layout']) =>
  store.dispatch('setLayout', layout);
