import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'playerCover')(state => {
  const current = state.entities.song.get(state.player.current.id ?? '');
  const src = (current?._id && state.app.directory.thumbs) ?
    new URL(`${current.image}/256.jpg`, `${state.app.directory.thumbs}/`).href :
    'icons/icon_light.png';

  return src;
});
