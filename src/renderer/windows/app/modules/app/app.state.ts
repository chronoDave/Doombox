import store from '../../state/store';

export default store.select(state => {
  const current = state.entities.song.get(state.player.current.id ?? '');

  return current ?
    `${current.artist} - ${current.title} (${current.album})` :
    'Doombox';
});
