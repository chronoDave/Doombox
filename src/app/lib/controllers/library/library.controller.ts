import type { IpcInvokeController } from '../../../../types/ipc';
import type { Album, Label, Song } from '../../../../types/library';
import type { UserShape } from '../../../../types/shapes/user.shape';
import type Storage from '../../storage';
import type { WebContents } from 'electron';
import type LeafDB from 'leaf-db';

import Kuroshiro from 'kuroshiro';
import pMap from 'p-map';

import { IpcChannel } from '../../../../types/ipc';
import difference from '../../../../utils/array/difference';
import ipcSend from '../../utils/ipcSend';

import fetchLibrary from './utils/fetchLibrary';
import getFiles from './utils/getFiles';
import groupSongs from './utils/groupSongs';
import parseFiles from './utils/parseFiles';
import writeImage from './utils/writeImage';

export type LibraryControllerProps = {
  root: string,
  db: {
    songs: LeafDB<Song>,
    albums: LeafDB<Album>,
    labels: LeafDB<Label>
  },
  analyzer: Kuroshiro
  storage: Storage<UserShape>
};

export default (props: LibraryControllerProps) =>
  (sender: WebContents): IpcInvokeController[IpcChannel.Library] => {
    const update = ipcSend(sender)(IpcChannel.Scan);
    const rebuild = async (albums: Album[], labels: Label[]) => {
      await Promise.all([
        props.db.albums.drop(),
        props.db.labels.drop()
      ]);
      await Promise.all([
        props.db.albums.insert(albums),
        props.db.labels.insert(labels)
      ]);
    };
    const insert = async (files: string[]) => {
      if (files.length === 0) return props.db.songs.find({});
      const toRomaji = (x?: string) => {
        const { romaji } = props.storage.get('scanner');

        if (!x || !Kuroshiro.Util.hasJapanese(x)) return Promise.resolve(null);
        return props.analyzer.convert(x, {
          to: 'romaji',
          mode: 'spaced',
          romajiSystem: romaji.system
        });
      };
      const { songs, images } = await parseFiles(toRomaji)(files, props.root, song => update({
        process: 'scanning files',
        file: song.file,
        size: files.length
      }));
      await pMap(images.entries(), ([b64, file]) => {
        update({ process: 'creating thumbnails', file, size: images.size });
        writeImage(b64, file);
      }, { concurrency: 32 });

      return props.db.songs.insert(songs);
    };

    return ({
      get: () => fetchLibrary(props.db),
      rebuild: async ({ folders, force }) => {
        const songsOld = await props.db.songs.find({});
        const filesOld = songsOld.map(song => song.file);
        const files = await getFiles(folders);

        const stale = songsOld.filter(song => !files.includes(song.file));
        const fresh = force ? files : difference(files, filesOld);

        await props.db.songs.delete(stale.map(song => song._id));
        const songs = await insert(fresh);
        const { albums, labels } = groupSongs(songs);
        await rebuild(albums, labels);

        return ({ songs, albums, labels });
      },
      add: async folders => {
        const current = await props.db.songs.find({});
        const files = await getFiles(folders);

        const fresh = files.filter(file => current.every(song => song.file !== file));
        const songs = await insert(fresh);
        const { albums, labels } = groupSongs(songs);
        await rebuild(albums, labels);

        return ({ songs, albums, labels });
      },
      remove: async folders => {
        const files = await getFiles(folders);

        await Promise.all(files.map(file => {
          update({ process: 'deleting files', file, size: files.length });
          return props.db.songs.deleteOne({ file });
        }));

        const songs = await props.db.songs.find({});
        const { albums, labels } = groupSongs(songs);
        await rebuild(albums, labels);

        return ({ songs, albums, labels });
      }
    });
  };
