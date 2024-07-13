import { populateAlbums } from '../../state/selectors';
import store from '../../state/store';

export default store.select(state => ({
  current: state.player.current.id,
  data: Array.from(state.entities.label.values())
    .map(label => [
      label,
      populateAlbums(state)(label.albums)
    ])
    .flat(2)
}));
