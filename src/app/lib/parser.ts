import type { Song } from '../../types/library';
import type { UserShape } from '../../types/shapes/user.shape';
import type Storage from './storage/storage';
import type { INativeTags } from 'music-metadata/lib/type';

import Kuroshiro from 'kuroshiro';
import LeafDB from 'leaf-db';
import { parseFile } from 'music-metadata';
import pMap from 'p-map';
import { TypedEmitter } from 'tiny-typed-emitter';

export type ParserResult = {
  songs: Song[]
  images: Map<string, string>
};

export type ParserOptions = {
  analyzer: Kuroshiro
  storage: Storage<UserShape>
};

export type ParserEvents = {
  parse: (event: { file: string, total: number }) => void
};

export default class Parser extends TypedEmitter<ParserEvents> {
  private readonly _analyzer: Kuroshiro;
  private readonly _storage: Storage<UserShape>;

  private async _toRomaji(x?: string) {
    const { romaji } = this._storage.get().scanner;

    if (!x || !Kuroshiro.Util.hasJapanese(x)) return Promise.resolve(null);
    return this._analyzer.convert(x, {
      to: 'romaji',
      mode: 'spaced',
      romajiSystem: romaji.system
    });
  }

  private async _parseFile(file: string): Promise<Song> {
    const metadata = await parseFile(file);
    const romaji = await Promise.all([
      this._toRomaji(metadata.common.title),
      this._toRomaji(metadata.common.artist),
      this._toRomaji(metadata.common.album),
      this._toRomaji(metadata.common.albumartist),
      this._toRomaji(metadata.common.label?.[0])
    ])
      .then(([title, artist, album, albumartist, label]) => (
        { title, artist, album, albumartist, label }
      ));

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
      date: metadata.common.date ?? Parser.getTagNative(metadata.native, 'TDAT'),
      cdid: Parser.getTagNative(metadata.native, 'TXXX:CDID'),
      // Romaji
      romaji
    });
  }

  static getTagNative(nativeTags: INativeTags, nativeTag: string) {
    const tag = Object.entries(nativeTags)
      .find(([key]) => key === nativeTag);

    return tag && typeof tag[1] === 'string' ?
      tag[1] :
      null;
  }

  constructor(options: ParserOptions) {
    super();

    this._analyzer = options.analyzer;
    this._storage = options.storage;
  }

  async parse(files: string[]): Promise<ParserResult> {
    const images = new Map<string, string>();
    const songs = await pMap(files, async file => {
      const song = await this._parseFile(file);
      if (song.image) {
        if (!images.has(song.image)) images.set(song.image, LeafDB.generateId());
        song.image = images.get(song.image) ?? null;
      }

      this.emit('parse', { file, total: files.length });

      return song;
    }, { concurrency: 64 });

    return ({ songs, images });
  }
}
