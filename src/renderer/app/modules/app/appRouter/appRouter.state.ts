import createSelector from '@doombox/renderer/store/selector';

import store from '../../../store';

export default createSelector(store, 'appRouter')(state => state.route.app);
