import type { IpcInvokeController } from '../../../types/ipc';
import type { Album, Label, Song } from '../../../types/library';
import type { UserShape } from '../../../types/shapes/user.shape';
import type Library from '../../lib/library';
import type Storage from '../../lib/storage/storage';
import type { WebContents } from 'electron';
import type LeafDB from 'leaf-db';

import { IpcChannel } from '../../../types/ipc';
import difference from '../../../utils/array/difference';
import globs from '../../../utils/collection/globs';
import ipcSend from '../../utils/ipc/ipcSend';

export type LibraryControllerProps = {
  library: Library
  storage: Storage<UserShape>
  db: {
    songs: LeafDB<Song>,
    albums: LeafDB<Album>,
    labels: LeafDB<Label>
  },
};

export default (props: LibraryControllerProps) =>
  (sender: WebContents): IpcInvokeController[IpcChannel.Library] => {
    const send = ipcSend(sender)(IpcChannel.Scan);
    props.library.on('insert', event => send({
      process: 'creating thumbnails',
      file: event.image,
      size: event.total
    }));
    props.library.on('parse', event => send({
      process: 'scanning files',
      file: event.file,
      size: event.total
    }));

    return ({
      get: () => Promise.all([
        props.db.songs.find({}),
        props.db.albums.find({}),
        props.db.labels.find({})
      ]).then(([songs, albums, labels]) => ({ songs, albums, labels })),
      reindex: async folders => {
        const oldSongs = await props.db.songs.find({});
        const oldFiles = oldSongs.map(song => song.file);
        const files = await globs(folders, '**/*.mp3');
        const stale = oldSongs.filter(song => !files.includes(song.file));
        const fresh = difference(files, oldFiles);

        await props.db.songs.delete(stale.map(song => song._id));
        await props.library.insert(fresh);

        return props.library.rebuild();
      },
      rebuild: async () => {
        const { folders } = props.storage.get('library');

        props.db.songs.drop();
        const files = await globs(folders, '**/*.mp3');
        await props.library.insert(files);

        return props.library.rebuild();
      },
      add: async folders => {
        const current = await props.db.songs.find({});
        const files = await globs(folders, '**/*.mp3');
        const fresh = files.filter(file => current.every(song => song.file !== file));
        await props.library.insert(fresh);

        return props.library.rebuild();
      },
      remove: async folders => {
        const files = await globs(folders, '**/*.mp3');

        await Promise.all(files.map(file => {
          send({ process: 'deleting files', file, size: files.length });
          return props.db.songs.deleteOne({ file });
        }));

        return props.library.rebuild();
      }
    });
  };