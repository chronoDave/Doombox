import type { Label, Album } from '../../../types/library';

import LeafDB from 'leaf-db';

import group from '../../../utils/collection/group';

export default (arr: Album[]): Label[] => Object.entries(group(arr, 'label'))
  .map(([label, albums]) => {
    const { duration, ids } = albums
      .reduce<{ duration: number, ids: string[] }>((acc, cur) => {
        acc.ids.push(cur._id);
        acc.duration += (cur.duration ?? 0);

        return acc;
      }, { duration: 0, ids: [] });

    return ({
      _id: LeafDB.generateId(),
      albums: ids,
      songs: albums
        .map(album => album.songs)
        .flat(),
      label,
      duration
    });
  });
