import type { Album, Label } from '../../../types/library';

import LeafDB from 'leaf-db';

import sum from '../../../utils/array/sum';
import group from '../../../utils/collection/group';

export default (arr: Album[]): Label[] => Object.entries(group(arr, 'label'))
  .map(([label, albums]) => ({
    _id: LeafDB.generateId(),
    albums: albums
      .sort((a, b) => {
        if (a.label !== b.label && a.label && b.label) {
          return a.label.localeCompare(b.label);
        }
        if (a.albumartist !== b.albumartist && a.albumartist && b.albumartist) {
          return a.albumartist.localeCompare(b.albumartist);
        }
        if (a.year !== b.year && a.year && b.year) {
          return a.year - b.year;
        }
        if (a.album !== b.album && a.album && b.album) {
          return a.album.localeCompare(b.album);
        }

        return 1;
      })
      .map(album => album._id),
    songs: albums
      .sort((a, b) => (
        (b.year ?? Number.MAX_SAFE_INTEGER) -
        (a.year ?? Number.MAX_SAFE_INTEGER)
      ))
      .map(album => album.songs)
      .flat(),
    label,
    duration: sum(albums, album => album.duration ?? 0)
  }));
