import createSelector from '../../../../lib/store/selector';
import store from '../../../store';

export default createSelector(store, 'playerMeta')(state => {
  const { id } = state.player.current;

  if (!id) return null;
  return state.entities.song.get(id);
});
