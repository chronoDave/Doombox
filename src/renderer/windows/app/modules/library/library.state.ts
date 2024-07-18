import type { Label, Album } from '@doombox/types/library';

import { populateAlbums } from '../../state/selectors';
import store from '../../state/store';

export default store.select<{
  current: string | null
  dir: string | null
  data: Array<Album<string> | Label<string, string>>
}>(() => ({
  current: null,
  dir: null,
  data: []
}), async state => ({
  dir: await window.ipc.os.image(),
  current: state.player.current.id,
  data: Array.from(state.entities.label.values())
    .map(label => [
      label,
      populateAlbums(state)(label.albums)
    ])
    .flat(2)
}));
