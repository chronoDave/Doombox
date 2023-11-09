import store from '../../state/store';
import createSelector from '../../utils/createSelector';

export default createSelector(store)(state => ({
  duration: state.player.current.duration,
  position: state.player.current.position
}));
