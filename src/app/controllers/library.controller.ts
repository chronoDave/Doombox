import type { IpcInvokeController, IpcChannel } from '../../types/ipc';
import type { Album, Label, Song } from '../../types/library';
import type { UserShape } from '../../types/shapes/user.shape';
import type Library from '../lib/library/library';
import type Storage from '../lib/storage/storage';
import type { WebContents } from 'electron';
import type LeafDB from 'leaf-db';

import { IpcRoute } from '../../types/ipc';
import difference from '../../utils/array/difference';
import globs from '../../utils/glob/globs';
import createIpcSend from '../utils/ipcSend';

export type LibraryControllerProps = {
  storage: Storage<UserShape>
  library: Library
  db: {
    song: LeafDB<Song>
    album: LeafDB<Album>
    label: LeafDB<Label>
  }
};

export default (props: LibraryControllerProps) =>
  (sender: WebContents): IpcInvokeController[IpcChannel.Library] => {
    const globMp3 = globs('**/*.mp3');
    const ipcSend = createIpcSend(sender);

    props.library
      .on('image', payload => ipcSend(IpcRoute.Image)(payload))
      .on('song', payload => ipcSend(IpcRoute.Song)(payload));

    return ({
      get: () => props.library.all(),
      reindex: async folders => {
        const oldSongs = props.library.songs();
        const oldFiles = oldSongs.map(song => song.file);
        const files = await globMp3(folders);
        const stale = oldSongs.filter(song => !files.includes(song.file));
        const fresh = difference(files, oldFiles);

        props.library.delete(stale.map(song => song._id));
        return props.library.insert(fresh);
      },
      rebuild: async () => {
        props.library.drop();
        const files = await globMp3(props.storage.get().library.folders);
        return props.library.insert(files);
      },
      add: async folders => {
        const current = props.library.songs();
        const files = await globMp3(folders);
        const fresh = files.filter(file => current.every(song => song.file !== file));
        return props.library.insert(fresh);
      },
      remove: async folders => {
        const stale = await globMp3(folders);
        const fresh = await globMp3(props.storage.get().library.folders);

        props.library.delete(stale);
        return props.library.insert(fresh);
      },
      search: async query => {
        const songs = props.db.song.select(...[
          { title: { $text: query } },
          { artist: { $text: query } },
          { romaji: { title: { $text: query } } },
          { romaji: { artist: { $text: query } } }
        ]);
        const albums = props.db.album.select(...[
          { album: { $text: query } },
          { albumartist: { $text: query } },
          { romaji: { album: { $text: query } } },
          { romaji: { albumartist: { $text: query } } }
        ]);
        const labels = props.db.label.select(...[
          { label: { $text: query } },
          { romaji: { label: { $text: query } } }
        ]);

        return ({ songs, albums, labels });
      }
    });
  };
