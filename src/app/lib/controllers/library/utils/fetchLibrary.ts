import type {
  Album,
  Label,
  Library,
  Song
} from '../../../../../types/library';
import type LeafDB from 'leaf-db';

export default (db: {
  songs: LeafDB<Song>,
  albums: LeafDB<Album>,
  labels: LeafDB<Label>
}): Promise<Library> => Promise.all([
  db.songs.find({}),
  db.albums.find({}),
  db.labels.find({})
]).then(([songs, albums, labels]) => ({ songs, albums, labels }));
