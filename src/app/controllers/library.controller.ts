import type Storage from '../../lib/storage/storage';
import type { TransferController } from '../../types/ipc';
import type { UserShape } from '../../types/shapes/user.shape';
import type Library from '../lib/library/library';

import globs from '@doombox/lib/glob/globs';

import difference from '../../lib/list/difference';

export type LibraryControllerProps = {
  storage: Storage<UserShape>
  library: Library
};

export default (props: LibraryControllerProps): TransferController['library'] => ({
  add: async folders => {
    const files = await globs('**/*.mp3')(folders);
    const fresh = difference(files)(props.library.select().songs.map(x => x.file));

    return props.library.insert(Array.from(fresh));
  },
  remove: async folders => {
    const stale = await globs('**/*.mp3')(folders);
    const fresh = await globs('**/*.mp3')(props.storage.state.library.folders);

    props.library.remove(stale);
    return props.library.insert(fresh);
  },
  select: async query => props.library.select(query ?? undefined),
  reindex: async () => {
    const { songs } = props.library.select();

    const files = await globs('**/*.mp3')(props.storage.state.library.folders);
    const stale = songs.filter(song => !files.includes(song.file));
    const fresh = difference(files)(songs.map(song => song.file));

    props.library.remove(stale.map(song => song._id));

    if (fresh.length > 0) return props.library.insert(fresh);
    return props.library.select();
  },
  rebuild: async () => {
    props.library.drop();
    const files = await globs('**/*.mp3')(props.storage.state.library.folders);

    return props.library.insert(files);
  }
});
