import type { Album, Song } from '../../../types/library';

import LeafDB from 'leaf-db';

import sum from '../../../utils/array/sum';
import group from '../../../utils/collection/group';

export default (arr: Song[]): Album[] => Object.entries(group(arr, 'album'))
  .map(([album, songs]) => ({
    _id: LeafDB.generateId(),
    image: songs[0].image,
    songs: songs
      .sort((a, b) => {
        if (a.disc.no !== b.disc.no && a.disc.no && b.disc.no) {
          return a.disc.no - b.disc.no;
        }
        if (a.track.no !== b.track.no && a.track.no && b.track.no) {
          return a.track.no - b.track.no;
        }

        return 1;
      })
      .map(song => song._id),
    duration: sum(songs, song => song.duration ?? 0),
    albumartist: songs[0].albumartist,
    album,
    label: songs[0].label,
    date: songs[0].date,
    year: songs[0].year,
    cdid: songs[0].cdid
  }));
