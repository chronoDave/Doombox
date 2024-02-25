import type { IpcPayloadReceive, IpcRoute } from '../../../types/ipc';
import type { Song } from '../../../types/library';
import type Transliterator from '../transliterator/transliterator';
import type { INativeTags } from 'music-metadata/lib/type';

import LeafDB from 'leaf-db';
import { parseFile } from 'music-metadata';
import pMap from 'p-map';

import EventEmitter from '../../../lib/eventEmitter/eventEmitter';

export type ParserProps = {
  transliterator: Transliterator
};

export type ParserEvents = {
  parse: (payload: IpcPayloadReceive[IpcRoute.Song]) => void
};

export default class Parser extends EventEmitter<ParserEvents> {
  private readonly _transliterator: Transliterator;

  private _transliterate(x?: string | null) {
    if (!x) return null;
    return this._transliterator.transliterate(x);
  }

  constructor(props: ParserProps) {
    super();

    this._transliterator = props.transliterator;
  }

  static getNativeTag<T extends INativeTags>(nativeTags: T) {
    return (nativeTag: keyof T) => {
      const tags = Object.values(nativeTags).flat();
      const tag = tags.find(itag => itag.id === nativeTag);

      return tag?.value;
    };
  }

  async parseFile(file: string): Promise<Song> {
    const metadata = await parseFile(file);
    const nativeTag = Parser.getNativeTag(metadata.native);

    const date = nativeTag('TDAT');
    const cdid = nativeTag('TXXX:CDID');
    const label = Array.isArray(metadata.common.label) ?
      metadata.common.label[0] :
      null;

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
      label,
      track: metadata.common.track,
      disc: metadata.common.disk,
      year: metadata.common.year ?? null,
      date: metadata.common.date ?? (typeof date === 'string' ? date : null),
      cdid: typeof cdid === 'string' ? cdid : null,
      // Romaji
      romaji: {
        artist: this._transliterate(metadata.common.artist),
        title: this._transliterate(metadata.common.title),
        album: this._transliterate(metadata.common.album),
        albumartist: this._transliterate(metadata.common.albumartist),
        label: this._transliterate(label)
      }
    });
  }

  async parse(files: string[]) {
    const images = new Map<string, string>();
    const songs = await pMap(files, async (file, i) => {
      this.emit('parse', { size: files.length, file, cur: i });

      const song = await this.parseFile(file);

      if (song.image) {
        if (!images.has(song.image)) images.set(song.image, LeafDB.id());
        song.image = images.get(song.image) ?? null;
      }

      return song;
    }, { concurrency: 64 });

    return ({ songs, images });
  }
}
