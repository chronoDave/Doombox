import type { Song } from '../../../types/library';
import type { IAudioMetadata } from 'music-metadata';

import { generateId } from '../../../utils/string';

export default (payload: Array<{ file: string, metadata: IAudioMetadata }>) => {
  const pictures = new Map<string, string>(); // Map<image, id>
  const songs = payload.map(({ metadata, file }) => {
    const picture = Array.isArray(metadata.common.picture) ?
      metadata.common.picture[0].data.toString('base64') :
      null;

    if (picture && !pictures.has(picture)) pictures.set(picture, generateId());

    const native: Record<string, unknown> = Object.fromEntries(Object.values(metadata.native)
      .flat()
      .map(({ id, value }) => [id, value]));

    const getNativeTag = (...tags: string[]): string | null => {
      const tag = Object.entries(native).find(([key]) => tags.includes(key));
      if (tag && typeof tag[1] === 'string') return tag[1];
      return null;
    };

    const song: Song = {
      _id: generateId(),
      _image: picture ?
        pictures.get(picture) :
        undefined,
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
