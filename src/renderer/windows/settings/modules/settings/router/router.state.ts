import createSelector from '@doombox/renderer/store/selector';

import store from '../../../state/store';

export default createSelector(store, 'router')(state => state.route);
