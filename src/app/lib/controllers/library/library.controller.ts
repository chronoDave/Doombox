import type { IpcInvokeController } from '../../../../types/ipc';
import type { Album, Label, Song } from '../../../../types/library';
import type { WebContents } from 'electron';
import type LeafDB from 'leaf-db';

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
  root: {
    covers: string,
    thumbs: string
  },
  db: {
    songs: LeafDB<Song>,
    albums: LeafDB<Album>,
    labels: LeafDB<Label>
  }
};

export default (props: LibraryControllerProps) =>
  (sender: WebContents): IpcInvokeController[IpcChannel.Library] => {
    const update = ipcSend(sender)(IpcChannel.Scan);
    const createImage = writeImage(props.root.covers);
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

    return ({
      get: () => fetchLibrary(props.db),
      rebuild: async folders => {
        const songsOld = await props.db.songs.find({});
        const filesOld = songsOld.map(song => song.file);
        const filesNew = await getFiles(folders);

        const stale = songsOld.filter(song => !filesNew.includes(song.file));
        const fresh = difference(filesNew, filesOld);

        if (fresh.length > 0) update({ size: fresh.length });

        await props.db.songs.delete(stale.map(song => song._id));
        const { songs, images } = await parseFiles(fresh);
        await pMap(images.entries(), ([b64, id]) => createImage(b64, id), { concurrency: 64 });
        await props.db.songs.insert(songs);

        const { albums, labels } = groupSongs(songs);
        await rebuild(albums, labels);

        return ({ songs, albums, labels });
      },
      add: async folders => {
        const current = await props.db.songs.find({});
        const files = await getFiles(folders);

        if (files.length > 0) update({ size: files.length });

        const fresh = files.filter(file => current.every(song => song.file !== file));
        const { songs, images } = await parseFiles(fresh, song => update({ file: song.file }));
        await pMap(images.entries(), ([b64, id]) => createImage(b64, id), { concurrency: 16 });
        await props.db.songs.insert(songs);

        const { albums, labels } = groupSongs(songs);
        await rebuild(albums, labels);

        return ({ songs, albums, labels });
      },
      remove: async folders => {
        const files = await getFiles(folders);

        if (files.length > 0) update({ size: files.length });
        await Promise.all(files.map(file => {
          update({ file });
          return props.db.songs.deleteOne({ file });
        }));

        const songs = await props.db.songs.find({});
        const { albums, labels } = groupSongs(songs);
        await rebuild(albums, labels);

        return ({ songs, albums, labels });
      }
    });
  };
