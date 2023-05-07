import { mute, volume } from './player.actions';
import { setViewApp } from './view.actions';

export const fetchCache = async () => {
  const cache = await window.ipc.cache.get();

  setViewApp(cache.tab);
  volume(cache.player.volume);
  mute(cache.player.muted);
};
