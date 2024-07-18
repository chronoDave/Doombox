import type { Label, Album } from '@doombox/types/library';

import store from '../../state/store';

export default store.select<{
  current: string | null
  dir: string | null
  data: Array<Album<string> | Label<string, string>>
}>(() => ({
  current: null,
  dir: null,
  data: []
}), async state => {
  const dir = await window.ipc.os.image();
  const labels = Array.from(state.entities.label.values());
  const data = await Promise.all(labels.map(async label => {
    const albums = await Promise.all(label.albums.map(window.ipc.entity.album));
    return [label, albums];
  }));

  return ({
    dir,
    current: state.player.current.id,
    data: data.flat(2)
  });
});
