import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'playerCover')(state => {
  const current = state.entities.song.get(state.player.current.id ?? '');

  if (!current?._id || !state.app.directory.thumbs) {
    return Object.fromEntries(['xs', 'md', 'lg'].map(size => [size, 'icons/icon_light.png']));
  }

  return ({
    xs: new URL(`${current.image}/192.jpg`, `${state.app.directory.thumbs}/`).href,
    md: new URL(`${current.image}/256.jpg`, `${state.app.directory.thumbs}/`).href,
    lg: new URL(`${current.image}/384.jpg`, `${state.app.directory.thumbs}/`).href
  });
});
