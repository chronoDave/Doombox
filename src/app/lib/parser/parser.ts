import type { IpcPayloadReceive, IpcRoute } from '../../../types/ipc';
import type { Song } from '../../../types/library';
import type { INativeTags } from 'music-metadata/lib/type';

import LeafDB from 'leaf-db';
import { parseFile } from 'music-metadata';
import pMap from 'p-map';

import EventEmitter from '../../../utils/event/eventEmitter';

export type ParserEvents = {
  parse: (payload: IpcPayloadReceive[IpcRoute.Song]) => void
};

export default class Parser extends EventEmitter<ParserEvents> {
  static getNativeTag<T extends INativeTags>(nativeTags: T) {
    return (nativeTag: keyof T) => {
      const tags = Object.values(nativeTags).flat();
      const tag = tags.find(itag => itag.id === nativeTag);

      return tag?.value;
    };
  }

  static async parseFile(file: string): Promise<Song> {
    const metadata = await parseFile(file);
    const nativeTag = Parser.getNativeTag(metadata.native);

    const date = nativeTag('TDAT');
    const cdid = nativeTag('TXXX:CDID');

    return ({
      _id: LeafDB.id(),
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
  }

  async parse(files: string[]) {
    const images = new Map<string, string>();
    const songs = await pMap(files, async (file, i) => {
      this._emit('parse', { size: files.length, file, cur: i });

      const song = await Parser.parseFile(file);

      if (song.image) {
        if (!images.has(song.image)) images.set(song.image, LeafDB.id());
        song.image = images.get(song.image) ?? null;
      }

      return song;
    }, { concurrency: 64 });

    return ({ songs, images });
  }
}
