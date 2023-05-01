import type { LibraryDatabase } from '../../types';

import groupAlbums from './groupAlbums';
import groupLabels from './groupLabels';

export default (library: LibraryDatabase) => async () => {
  const songs = await library.songs.find({});
  const albums = groupAlbums(songs);
  const labels = groupLabels(albums);

  await Promise.all([
    library.albums.drop(),
    library.labels.drop()
  ]);
  await Promise.all([
    library.albums.insert(albums),
    library.labels.insert(labels)
  ]);

  return ({ songs, albums, labels });
};
