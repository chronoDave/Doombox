import type { Song } from '../../../types/library';

import { parseFile } from 'music-metadata';
import LeafDB from 'leaf-db';

export default async (files: string[]) => {
  const data = await Promise.all(files.map(async file => {
    const metadata = await parseFile(file, { duration: true });
    return ({ file, metadata });
  }));

  const pictures = new Map<string, { _id: string, raw: Buffer }>(); // Map<image, id>
  const songs = data.map(({ metadata, file }) => {
    let b64 = '';
    const raw = Array.isArray(metadata.common.picture) ?
      metadata.common.picture[0].data :
      null;

    if (raw) {
      b64 = raw.toString('base64');
      if (!pictures.has(b64)) pictures.set(b64, { _id: LeafDB.generateId(), raw });
    }

    const native: Record<string, unknown> = Object.fromEntries(Object.values(metadata.native)
      .flat()
      .map(({ id, value }) => [id, value]));

    const getNativeTag = (...tags: string[]): string | null => {
      const tag = Object.entries(native).find(([key]) => tags.includes(key));
      if (tag && typeof tag[1] === 'string') return tag[1];
      return null;
    };

    const song: Song = {
      _id: LeafDB.generateId(),
      image: pictures.get(b64)?._id ?? null,
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
      date: metadata.common.date ?? getNativeTag('TDAT'),
      cdid: getNativeTag('TXXX:CDID')
    };

    return song;
  });

  return ({ songs, pictures });
};
