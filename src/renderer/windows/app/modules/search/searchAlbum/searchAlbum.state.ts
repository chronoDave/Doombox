import store from '../../../state/store';

export default store.select(state => state.search.albums);
