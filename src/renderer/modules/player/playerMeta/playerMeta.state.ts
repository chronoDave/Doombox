import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'playerMeta')(state => {
  const { id } = state.player.current;

  if (!id) return null;
  return state.entities.song.get(id);
});
