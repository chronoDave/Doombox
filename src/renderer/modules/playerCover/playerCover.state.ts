import { Thumb } from '../../../types/library';
import store from '../../store';
import createSelector from '../../utils/createSelector';

export default createSelector(store)(state => {
  const current = state.entities.song.get(state.player.current.id ?? '');
  const src = (current?._id && state.app.directory.thumbs) ?
    new URL(`${current.image}x${Thumb.Player}.jpg`, `${state.app.directory.thumbs}/`).href :
    'icons/icon_light.png';

  return ({
    current,
    src
  });
});
