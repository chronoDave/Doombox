import type { Song } from '../../../../../types/library';

import LeafDB from 'leaf-db';
import { parseFile } from 'music-metadata';

export default (file: string): Promise<{ song: Song, image: Buffer | null }> => parseFile(file)
  .then(metadata => {
    const getTagNative = (native: string) => {
      const tag = Object.entries(metadata.native)
        .find(([key]) => key === native);
      if (tag && typeof tag[1] === 'string') return tag[1];
      return null;
    };

    return ({
      song: {
        _id: LeafDB.generateId(),
        image: null,
        file,
        // Metadata
        duration: metadata.format.duration ?? null,
        artist: metadata.common.artist ?? null,
        title: metadata.common.title ?? null,
        album: metadata.common.album ?? null,
        albumartist: metadata.common.albumartist ?? null,
        label: Array.isArray(metadata.common.label) ?
          metadata.common.label[0] :
          null,
        track: metadata.common.track,
        disc: metadata.common.disk,
        year: metadata.common.year ?? null,
        date: metadata.common.date ?? getTagNative('TDAT'),
        cdid: getTagNative('TXXX:CDID')
      },
      image: Array.isArray(metadata.common.picture) ?
        metadata.common.picture[0].data :
        null
    });
  });