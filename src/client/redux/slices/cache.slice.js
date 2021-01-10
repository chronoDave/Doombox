import { CACHE } from '@doombox-config';
import { WINDOW } from '@doombox-utils/types';

import { createReduxSlice } from '../utils';

const initialState = {
  player: CACHE.player,
  folders: CACHE.folders,
  tabs: CACHE.tabs
};

const reducers = {
  setCache: (state, payload) => {
    const normalizeVolume = () => {
      if (!payload.player || typeof payload.player.volume !== 'number') return state.player.volume;
      if (payload.player.volume > 1) return 1;
      if (payload.player.volume < 0) return 0;
      return payload.player.volume;
    };

    const normalizeTab = (tab, tabs) => {
      if (!payload.tabs || typeof payload.tabs[tab] !== 'string') return state.tabs.search;
      if (!tabs.includes(payload.tabs[tab])) return state.tabs.search;
      return payload.tabs[tab];
    };

    return ({
      player: {
        muted: (!payload.player || typeof payload.player.muted === 'boolean') ?
          payload.player.muted :
          state.player.muted,
        volume: normalizeVolume()
      },
      folders: Array.isArray(payload.folders) ?
        payload.folders :
        state.folders,
      tabs: {
        search: normalizeTab('search', [
          WINDOW.TABS.SONGS,
          WINDOW.TABS.ALBUMS,
          WINDOW.TABS.LABELS
        ])
      }
    });
  }
};

export default createReduxSlice('cache', initialState, reducers);
