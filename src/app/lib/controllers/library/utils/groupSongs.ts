import type {
  Library,
  Song,
  Album,
  Label
} from '../../../../../types/library';

import LeafDB from 'leaf-db';

import group from '../../../../../utils/collection/group';

const groupAlbums = (arr: Song[]): Album[] => Object.entries(group(arr, 'album'))
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

const groupLabels = (arr: Album[]): Label[] => Object.entries(group(arr, 'label'))
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

export default (songs: Song[]): Library => {
  const albums = groupAlbums(songs);
  const labels = groupLabels(albums);

  return ({ songs, albums, labels });
};
