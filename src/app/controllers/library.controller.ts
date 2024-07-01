import type { IpcInvokeController, IpcChannel } from '../../types/ipc';
import type { Album, Label, Song } from '../../types/library';
import type { UserShape } from '../../types/shapes/user.shape';
import type Library from '../lib/library/library';
import type Storage from '../lib/storage/storage';
import type { BrowserWindow } from 'electron';
import type LeafDB from 'leaf-db';

import { glob } from 'fast-glob';

import difference from '../../lib/list/difference';
import levenshteinDistance from '../../lib/string/levenshteinDistance';
import { IpcRoute } from '../../types/ipc';
import createIpcSend from '../lib/ipc/send';

export type LibraryControllerProps = {
  storage: Storage<UserShape>
  library: Library
  window: BrowserWindow
  db: {
    song: LeafDB<Song>
    album: LeafDB<Album>
    label: LeafDB<Label>
  }
};

export default (props: LibraryControllerProps): IpcInvokeController[IpcChannel.Library] => {
  const getFiles = (folders: string[]) => Promise
    .all(folders.map(cwd => glob('**/*.mp3', { cwd, absolute: true })))
    .then(files => files.flat());

  const ipcSend = createIpcSend(props.window.webContents);

  props.library
    .on('image', payload => ipcSend(IpcRoute.Image)(payload))
    .on('song', payload => ipcSend(IpcRoute.Song)(payload));

  return ({
    get: () => props.library.all(),
    reindex: async ({ payload }) => {
      const oldSongs = props.library.songs();
      const oldFiles = oldSongs.map(song => song.file);
      const files = await getFiles(payload);
      const stale = oldSongs.filter(song => !files.includes(song.file));
      const fresh = difference(files)(oldFiles);

      props.library.delete(stale.map(song => song._id));
      return props.library.insert(fresh);
    },
    rebuild: async () => {
      props.library.drop();
      const files = await getFiles(props.storage.get().library.folders);
      return props.library.insert(files);
    },
    add: async ({ payload }) => {
      const current = props.library.songs();
      const files = await getFiles(payload);
      const fresh = files.filter(file => current.every(song => song.file !== file));
      return props.library.insert(fresh);
    },
    remove: async ({ payload }) => {
      const stale = await getFiles(payload);
      const fresh = await getFiles(props.storage.get().library.folders);

      props.library.delete(stale);
      return props.library.insert(fresh);
    },
    search: async ({ payload }) => {
      const songs = props.db.song.select(...[
        { title: { $text: payload } },
        { artist: { $text: payload } },
        { romaji: { title: { $text: payload } } },
        { romaji: { artist: { $text: payload } } }
      ])
        .sort((a, b) => {
          const distance = (x: Song) => x.title ?
            levenshteinDistance(x.title, payload) :
            Number.MAX_SAFE_INTEGER;

          return distance(a) - distance(b);
        });
      const albums = props.db.album.select(...[
        { album: { $text: payload } },
        { albumartist: { $text: payload } },
        { romaji: { album: { $text: payload } } },
        { romaji: { albumartist: { $text: payload } } }
      ])
        .sort((a, b) => {
          const distance = (x: Album) => x.album ?
            levenshteinDistance(x.album, payload) :
            Number.MAX_SAFE_INTEGER;

          return distance(a) - distance(b);
        });
      const labels = props.db.label.select(...[
        { label: { $text: payload } },
        { romaji: { label: { $text: payload } } }
      ])
        .sort((a, b) => {
          const distance = (x: Label) => x.label ?
            levenshteinDistance(x.label, payload) :
            Number.MAX_SAFE_INTEGER;

          return distance(a) - distance(b);
        });

      return ({ songs, albums, labels });
    }
  });
};
