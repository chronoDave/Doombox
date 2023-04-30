import player from '../player';

export const fetchCache = async () => {
  const cache = await window.ipc.cache.get();

  player.setVolume(cache.player.volume);
  player.mute(cache.player.muted);
};
