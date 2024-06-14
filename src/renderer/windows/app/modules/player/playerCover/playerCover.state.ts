import store from '../../../store';

export default store.select(state => {
  const current = state.entities.song.get(state.player.current.id ?? '');

  if (!current?._id) return Object.fromEntries(['xs', 'md', 'lg'].map(size => [size, '../icons/icon_light.png']));

  return ({
    xs: new URL(`${current.image}/192.jpg`, `${window.dir.thumbs}/`).href,
    md: new URL(`${current.image}/256.jpg`, `${window.dir.thumbs}/`).href,
    lg: new URL(`${current.image}/384.jpg`, `${window.dir.thumbs}/`).href
  });
});
