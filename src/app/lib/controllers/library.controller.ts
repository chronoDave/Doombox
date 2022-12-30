import type LeafDB from 'leaf-db';
import type {
  Album,
  Label,
  Library,
  Song
} from '../../../types/library';
import type { IpcChannel, IpcInvokeController } from '../../../types/ipc';

import path from 'path';
import glob from 'fast-glob';

import parseFiles from '../utils/parseFiles';
import createImageCover from '../utils/createImageCover';
import createImageThumb from '../utils/createImageThumb';
import groupAlbums from '../utils/groupAlbums';
import groupLabels from '../utils/groupLabels';
import difference from '../../../utils/array/difference';

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
  await Promise.all(Array.from(metadata.pictures).map(async ([, { _id, raw }]) => {
    await createImageCover(raw, path.resolve(props.root.covers, `${_id}.jpg`));
    await createImageThumb(raw, path.resolve(props.root.thumbs, `${_id}.jpg`));
  }));

  await props.db.songs.insert(metadata.songs);
  await rebuild(props);

  return getLibrary(props);
};

export default (props: LibraryControllerProps): IpcInvokeController[IpcChannel.Library] => ({
  get: () => getLibrary(props),
  rebuild: async folders => {
    const songsOld = await props.db.songs.find({});
    const filesOld = songsOld.map(song => song.file);
    const filesNew = await getFiles(folders);

    const stale = songsOld.filter(song => !filesNew.includes(song.file));
    const fresh = difference(filesNew, filesOld);

    await props.db.songs.delete(stale.map(song => song._id));
    const metadata = await parseFiles(fresh);

    return addSongs(props, metadata);
  },
  add: async folders => {
    const songs = await props.db.songs.find({});
    const files = await getFiles(folders);
    const fresh = files.filter(file => songs.every(song => song.file !== file));
    const metadata = await parseFiles(fresh);

    return addSongs(props, metadata);
  },
  remove: async folders => {
    const files = await getFiles(folders);

    await Promise.all(files.map(file => props.db.songs.deleteOne({ file })));
    await rebuild(props);

    return getLibrary(props);
  }
});
