import type { LibraryDatabase } from '../../types';

export default (library: LibraryDatabase) => () => Promise.all([
  library.songs.find({}),
  library.albums.find({}),
  library.labels.find({})
]).then(([songs, albums, labels]) => ({ songs, albums, labels }));
