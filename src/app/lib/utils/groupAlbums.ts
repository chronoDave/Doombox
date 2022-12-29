import type { Album, Song } from '../../../types/library';

import LeafDB from 'leaf-db';

import group from '../../../utils/collection/group';

export default (arr: Song[]): Album[] => Object.entries(group(arr, 'album'))
  .map(([album, songs]) => {
    const { duration, ids } = songs
      .reduce<{ duration: number, ids: string[] }>((acc, cur) => {
        acc.ids.push(cur._id);
        acc.duration += (cur.duration ?? 0);

        return acc;
      }, { duration: 0, ids: [] });

    return ({
      _id: LeafDB.generateId(),
      image: songs[0].image,
      songs: ids,
      duration,
      albumartist: songs[0].albumartist,
      album,
      label: songs[0].label,
      date: songs[0].date,
      year: songs[0].year,
      cdid: songs[0].cdid
    });
  });
