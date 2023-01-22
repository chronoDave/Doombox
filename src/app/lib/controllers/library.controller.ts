import type { IpcInvokeController, IpcPayloadScan } from '../../../types/ipc';
import type {
  Album,
  Label,
  Library,
  Song
} from '../../../types/library';
import type { WebContents } from 'electron';
import type LeafDB from 'leaf-db';

import glob from 'fast-glob';
import pMap from 'p-map';
import path from 'path';

import { IpcChannel } from '../../../types/ipc';
import difference from '../../../utils/array/difference';
import createImageCover from '../utils/createImageCover';
import createImageThumb from '../utils/createImageThumb';
import groupAlbums from '../utils/groupAlbums';
import groupLabels from '../utils/groupLabels';
import parseFiles from '../utils/parseFiles';

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

const getLibrary = async (props: LibraryControllerProps): Promise<Library> => Promise.all([
  props.db.songs.find({}),
  props.db.albums.find({}),
  props.db.labels.find({})
]).then(([songs, albums, labels]) => ({ songs, albums, labels }));

const getFiles = (folders: string[]) => Promise.all(folders
  .map(cwd => glob('**/*.mp3', { cwd, absolute: true })))
  .then(x => x.flat());

const rebuild = async (props: LibraryControllerProps) => {
  const songs = await props.db.songs.find({});

  props.db.albums.drop();
  props.db.labels.drop();

  const albums = groupAlbums(songs);
  const labels = groupLabels(albums);

  return Promise.all([
    props.db.albums.insert(albums),
    props.db.labels.insert(labels)
  ]);
};

const addSongs = async (
  props: LibraryControllerProps,
  metadata: Awaited<ReturnType<typeof parseFiles>>
) => {
  await pMap(Array.from(metadata.pictures), ([, { _id, raw }]) => Promise.all([
    createImageCover(raw, path.resolve(props.root.covers, `${_id}.jpg`)),
    createImageThumb(raw, path.resolve(props.root.thumbs, `${_id}.jpg`))
  ]), { concurrency: 8 });

  await props.db.songs.insert(metadata.songs);
  await rebuild(props);

  return getLibrary(props);
};

const sendUpdate = (sender: WebContents) =>
  (payload: IpcPayloadScan) => sender.send(IpcChannel.Listener, payload);

export default (props: LibraryControllerProps) =>
  (sender: WebContents): IpcInvokeController[IpcChannel.Library] => ({
    get: () => getLibrary(props),
    rebuild: async folders => {
      const update = sendUpdate(sender);

      const songsOld = await props.db.songs.find({});
      const filesOld = songsOld.map(song => song.file);
      const filesNew = await getFiles(folders);

      const stale = songsOld.filter(song => !filesNew.includes(song.file));
      const fresh = difference(filesNew, filesOld);

      if (fresh.length > 0) update({ size: fresh.length });

      await props.db.songs.delete(stale.map(song => song._id));
      const metadata = await parseFiles(fresh, props.root, file => update({ file }));

      return addSongs(props, metadata);
    },
    add: async folders => {
      const update = sendUpdate(sender);

      const songs = await props.db.songs.find({});
      const files = await getFiles(folders);

      if (files.length > 0) update({ size: files.length });

      const fresh = files.filter(file => songs.every(song => song.file !== file));
      const metadata = await parseFiles(fresh, props.root, file => update({ file }));

      return addSongs(props, metadata);
    },
    remove: async folders => {
      const update = sendUpdate(sender);

      const files = await getFiles(folders);

      if (files.length > 0) update({ size: files.length });

      await Promise.all(files.map(file => {
        update({ file });
        return props.db.songs.deleteOne({ file });
      }));
      await rebuild(props);

      return getLibrary(props);
    }
  });
