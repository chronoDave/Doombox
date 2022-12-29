import type LeafDB from 'leaf-db';
import type {
  Album,
  Image,
  Label,
  Library,
  Song
} from '../../../types/library';
import type { IpcChannel, IpcInvokeController } from '../../../types/ipc';
import type Storage from '../storage';
import type { UserShape } from '../../../types/shapes/user.shape';

import path from 'path';
import glob from 'fast-glob';

import intersect from '../../../utils/array/intersect';
import parseFiles from '../utils/parseFiles';
import createImageCover from '../utils/createImageCover';
import createImageThumb from '../utils/createImageThumb';
import groupAlbums from '../utils/groupAlbums';
import groupLabels from '../utils/groupLabels';

export type LibraryControllerProps = {
  storage: {
    user: Storage<UserShape>
  }
  root: {
    covers: string,
    thumbs: string
  },
  db: {
    images: LeafDB<Image>,
    songs: LeafDB<Song>,
    albums: LeafDB<Album>,
    labels: LeafDB<Label>
  }
};

const get = async (props: LibraryControllerProps): Promise<Library> => Promise.all([
  props.db.images.find({}),
  props.db.songs.find({}),
  props.db.albums.find({}),
  props.db.labels.find({})
]).then(([images, songs, albums, labels]) => ({ images, songs, albums, labels }));

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

export default (props: LibraryControllerProps): IpcInvokeController[IpcChannel.Library] => ({
  get: () => get(props),
  addFolders: async payload => {
    const settings = props.storage.user.get('library');
    const songs = await props.db.songs.find({});
    const folders = intersect(payload, settings.folders);

    if (folders.length === settings.folders.length) return get(props);

    props.storage.user.set('library', { folders });

    const files = await Promise.all(folders
      .map(cwd => glob('**/*.mp3', { cwd, absolute: true })))
      .then(x => x.flat());

    const fresh = files.filter(x => songs.every(({ file }) => file !== x));
    const stale = songs.reduce<string[]>((acc, song) => {
      if (!files.includes(song.file)) acc.push(song._id);
      return acc;
    }, []);

    props.db.songs.delete(stale);

    const metadata = await parseFiles(fresh);
    const images: Image[] = Array.from(metadata.pictures, ([, { _id }]) => ({ _id }));

    await Promise.all(Array.from(metadata.pictures).map(async ([, { _id, raw }]) => {
      await createImageCover(raw, path.resolve(props.root.covers, `${_id}.jpg`));
      await createImageThumb(raw, path.resolve(props.root.thumbs, `${_id}.jpg`));
    }));

    await Promise.all([
      props.db.images.insert(images),
      props.db.songs.insert(metadata.songs)
    ]);

    await rebuild(props);

    return get(props);
  },
  removeFolders: async payload => {
    if (payload.length === 0) return get(props);

    const settings = props.storage.user.get('library');
    const folders = settings.folders.filter(x => !payload.includes(x));
    props.storage.user.set('library', { folders });

    const files = await Promise.all(payload
      .map(cwd => glob('**/*.mp3', { cwd, absolute: true })))
      .then(x => x.flat());

    await Promise.all(files.map(file => props.db.songs.deleteOne({ file })));
    await rebuild(props);

    return get(props);
  }
});
