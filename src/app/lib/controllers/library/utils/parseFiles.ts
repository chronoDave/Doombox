import type { Song } from '../../../../../types/library';

import LeafDB from 'leaf-db';
import pMap from 'p-map';
import path from 'path';

import parseFile from './parseFile';

const parseFiles = async (
  files: string[],
  root: string,
  cb?: (song: Song) => void
): Promise<{ songs: Song[], images: Map<string, string> }> => {
  const images = new Map<string, string>();
  const songs = await pMap(files, async file => {
    const { song, image } = await parseFile(file);
    if (image) {
      const b64 = image.toString('base64');

      if (!images.has(b64)) images.set(b64, path.join(root, `${LeafDB.generateId()}.jpg`));
      song.image = images.get(b64) ?? null;
    }

    cb?.(song);
    return song;
  }, { concurrency: 64 });

  return ({ songs, images });
};

export default parseFiles;
