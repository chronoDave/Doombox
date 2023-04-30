import type { RendererShape } from '../../../types/shapes/renderer.shape';

import produce from 'immer';

import player from '../player';

export const setVolume = async (volume: number) => {
  const cache = await window.ipc.cache.get();

  player.setVolume(volume);
  window.ipc.cache.set(produce<RendererShape>(draft => {
    draft.player.volume = volume;
  })(cache));
};

export const setMuted = async (mute?: boolean) => {
  const cache = await window.ipc.cache.get();
  const muted = mute ?? !player.muted;

  player.mute(muted);
  window.ipc.cache.set(produce<RendererShape>(draft => {
    draft.player.muted = muted;
  })(cache));
};
