import { mute, setVolume } from './player.actions';

export const fetchCache = async () => {
  const cache = await window.ipc.cache.get();

  setVolume(cache.player.volume);
  mute(cache.player.muted);
};
