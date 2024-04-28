import createSelector from '@doombox/renderer/store/selector';

import store from '../../../store';

export default createSelector(store, 'searchSong')(state => state.search.songs);
