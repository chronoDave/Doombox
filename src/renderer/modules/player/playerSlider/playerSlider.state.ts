import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'playerSlider')(state => ({
  duration: state.player.current.duration,
  position: state.player.current.position
}));
