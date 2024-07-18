import store from '../../../state/store';

const initial = {
  xs: '../icons/icon_light.png',
  md: '../icons/icon_light.png',
  lg: '../icons/icon_light.png'
} as const;

export default store.selectAsync(initial, async state => {
  const current = state.player.current.id;
  if (!current) return initial;

  const song = await window.ipc.entity.song(current);
  const dir = await window.ipc.os.image();

  return ({
    xs: new URL(`${song.image}/192.jpg`, `${dir}/`).href,
    md: new URL(`${song.image}/256.jpg`, `${dir}/`).href,
    lg: new URL(`${song.image}/384.jpg`, `${dir}/`).href
  });
});
