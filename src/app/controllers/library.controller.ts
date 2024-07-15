import type Storage from '../../lib/storage/storage';
import type { TransferController } from '../../types/ipc';
import type { Album, Label, Song } from '../../types/library';
import type { UserShape } from '../../types/shapes/user.shape';
import type Library from '../lib/library/library';
import type LeafDB from 'leaf-db';

import { glob } from 'fast-glob';

import difference from '../../lib/list/difference';
import levenshteinDistance from '../../lib/string/levenshteinDistance';

export type LibraryControllerProps = {
  storage: Storage<UserShape>
  library: Library
  db: {
    song: LeafDB<Song>
    album: LeafDB<Album>
    label: LeafDB<Label>
  }
};

export default (props: LibraryControllerProps): TransferController['library'] => {
  const getFiles = (folders: string[]) => Promise
    .all(folders.map(cwd => glob('**/*.mp3', { cwd, absolute: true })))
    .then(files => files.flat());

  return ({
    get: () => props.library.all(),
    reindex: async () => {
      const oldSongs = props.library.songs();
      const oldFiles = oldSongs.map(song => song.file);
      const files = await getFiles(props.storage.state.library.folders);
      const stale = oldSongs.filter(song => !files.includes(song.file));
      const fresh = difference(files)(oldFiles);

      props.library.delete(stale.map(song => song._id));
      return props.library.insert(fresh);
    },
    rebuild: async () => {
      props.library.drop();
      const files = await getFiles(props.storage.state.library.folders);
      return props.library.insert(files);
    },
    add: async folders => {
      const current = props.library.songs();
      const files = await getFiles(folders);
      const fresh = files.filter(file => current.every(song => song.file !== file));
      return props.library.insert(fresh);
    },
    remove: async folders => {
      const stale = await getFiles(folders);
      const fresh = await getFiles(props.storage.state.library.folders);

      props.library.delete(stale);
      return props.library.insert(fresh);
    },
    search: async query => {
      const songs = props.db.song.select(...[
        { title: { $text: query } },
        { artist: { $text: query } },
        { romaji: { title: { $text: query } } },
        { romaji: { artist: { $text: query } } }
      ])
        .sort((a, b) => {
          const distance = (x: Song) => x.title ?
            levenshteinDistance(x.title, query) :
            Number.MAX_SAFE_INTEGER;

          return distance(a) - distance(b);
        });
      const albums = props.db.album.select(...[
        { album: { $text: query } },
        { albumartist: { $text: query } },
        { romaji: { album: { $text: query } } },
        { romaji: { albumartist: { $text: query } } }
      ])
        .sort((a, b) => {
          const distance = (x: Album) => x.album ?
            levenshteinDistance(x.album, query) :
            Number.MAX_SAFE_INTEGER;

          return distance(a) - distance(b);
        });
      const labels = props.db.label.select(...[
        { label: { $text: query } },
        { romaji: { label: { $text: query } } }
      ])
        .sort((a, b) => {
          const distance = (x: Label) => x.label ?
            levenshteinDistance(x.label, query) :
            Number.MAX_SAFE_INTEGER;

          return distance(a) - distance(b);
        });

      return ({ songs, albums, labels });
    }
  });
};
