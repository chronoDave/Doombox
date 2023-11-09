import { mute, setVolume } from './player.actions';
import { setViewApp } from './view.actions';

export const fetchCache = async () => {
  const cache = await window.ipc.cache.get();

  setViewApp(cache.tab);
  setVolume(cache.player.volume);
  mute(cache.player.muted);
};
