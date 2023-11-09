import type { Album } from '../../../types/library';

import { Thumb } from '../../../types/library';
import store from '../../state/store';
import createSelector from '../../utils/createSelector';

export default createSelector(store)(state => {
  const getThumb = (id: string | null) => (id && state.app.directory.thumbs) ?
    new URL(`${id}x${Thumb.Album}.jpg`, `${state.app.directory.thumbs}/`).href :
    'icons/icon_light.png';

  const albums = state.search.albums ? state.search.albums.reduce<(Album)[]>((acc, cur) => {
    const album = state.entities.album.get(cur);
    if (album) acc.push(({ ...album, image: getThumb(album.image) }));
    return acc;
  }, []) :
    Array.from(state.entities.album.values(), album => ({
      ...album,
      image: getThumb(album.image)
    }));

  return ({
    albums,
    current: state.entities.song.get(state.player.current.id ?? '')?.album
  });
}, (prev, cur) => (
  prev.search.albums?.length !== cur.search.albums?.length ||
  prev.entities.album.size !== cur.entities.album.size ||
  prev.entities.song.size !== cur.entities.song.size ||
  prev.player.current.id !== cur.player.current.id
));
