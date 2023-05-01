import type { Song } from '../../../types/library';

import LeafDB from 'leaf-db';
import { parseFile } from 'music-metadata';

import getNativeTag from './getNativeTag';

export default async (file: string): Promise<Song> => {
  const metadata = await parseFile(file);
  const nativeTag = getNativeTag(metadata.native);

  const date = nativeTag('TDAT');
  const cdid = nativeTag('TXXX:CDID');

  return ({
    _id: LeafDB.generateId(),
    file,
    image: Array.isArray(metadata.common.picture) ?
      metadata.common.picture[0].data.toString('base64') :
      null,
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
    date: metadata.common.date ?? (typeof date === 'string' ? date : null),
    cdid: typeof cdid === 'string' ? cdid : null
  });
};
