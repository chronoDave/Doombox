import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'homeNavigation')(state => ({
  home: state.route.home,
  settings: state.route.settings
}));
