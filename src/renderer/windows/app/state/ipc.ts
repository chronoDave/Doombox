import type { State } from './state';
import type Store from '@doombox/lib/store/store';

import produce from 'immer';

import { App } from './route';

const createEntity = <T extends object, K extends keyof T>(arr: T[], k: K): Map<T[K], T> =>
  new Map(arr.map(x => [x[k], x]));

export default async (store: Store<State>) => {
  const [
    user,
    cache,
    theme,
    playlists,
    library
  ] = await Promise.all([
    window.ipc.user.get(),
    window.ipc.cache.get(),
    window.ipc.theme.get(),
    window.ipc.playlist.get(),
    window.ipc.library.select()
  ]);

  store.set(produce(draft => {
    draft.user = user;
    draft.player.muted = cache.player.muted;
    draft.player.volume = cache.player.volume;
    draft.theme = theme;
    draft.entities.playlist = createEntity(playlists, '_id');
    draft.entities.song = createEntity(library.songs, '_id');
    draft.entities.album = createEntity(library.albums, '_id');
    draft.entities.label = createEntity(library.labels, '_id');
    draft.route.app = App.Home;
  }));
};
