import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'library')(state => ({
  query: state.search.query,
  route: state.route.search
}));
