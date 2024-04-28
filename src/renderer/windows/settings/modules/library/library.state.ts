import createSelector from '@doombox/renderer/store/selector';

import store from '../../state/store';

export default createSelector(store, 'library')(state => state.user.library);
