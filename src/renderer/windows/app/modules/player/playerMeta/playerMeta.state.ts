import store from '../../../store';

export default store.select(state => {
  const { id } = state.player.current;

  if (!id) return null;
  return state.entities.song.get(id);
});
