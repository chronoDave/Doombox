import type { Album, Label, Song } from '../../types/library';
import type { ParserEvents } from './parser';
import type Parser from './parser';

import LeafDB from 'leaf-db';
import pMap from 'p-map';
import path from 'path';
import sharp from 'sharp';
import { TypedEmitter } from 'tiny-typed-emitter';

import group from '../../utils/collection/group';

export type LibraryOptions = {
  parser: Parser
  root: {
    original: string
    thumb: string
  }
  db: {
    songs: LeafDB<Song>,
    albums: LeafDB<Album>,
    labels: LeafDB<Label>
  }
};

export type LibraryEvents = {
  insert: (event: { image: string, total: number }) => void
  parse: ParserEvents['parse']
};

export default class Library extends TypedEmitter<LibraryEvents> {
  private readonly _songs: LeafDB<Song>;
  private readonly _albums: LeafDB<Album>;
  private readonly _labels: LeafDB<Label>;
  private readonly _parser: Parser;
  private readonly _root: {
    original: string
    thumb: string
  };

  static groupAlbums(arr: Song[]): Album[] {
    return Object.entries(group(arr, 'album'))
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
          cdid: songs[0].cdid,
          romaji: songs[0].romaji
        });
      });
  }

  static groupLabels(arr: Album[]): Label[] {
    return Object.entries(group(arr, 'label'))
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
          duration,
          romaji: {
            label: albums[0].romaji.label
          }
        });
      });
  }

  constructor(options: LibraryOptions) {
    super();

    this._songs = options.db.songs;
    this._albums = options.db.albums;
    this._labels = options.db.labels;
    this._parser = options.parser;
    this._root = options.root;

    this._parser.on('parse', event => this.emit('parse', event));
  }

  async insert(files: string[]) {
    const { songs, images } = await this._parser.parse(files);
    await pMap(images.entries(), ([b64, id]) => {
      const file = `${id}.jpg`;
      this.emit('insert', { image: file, total: images.size });

      return Promise.all([
        sharp(Buffer.from(b64, 'base64'))
          .jpeg({ progressive: true })
          .toFile(path.join(this._root.original, file)),
        sharp(Buffer.from(b64, 'base64'))
          .jpeg({ progressive: true })
          .resize(164, 164)
          .toFile(path.join(this._root.thumb, file))
      ]);
    }, { concurrency: 32 });

    await this._songs.insert(songs);
  }

  async rebuild() {
    const songs = await this._songs.find({});
    const albums = Library.groupAlbums(songs);
    const labels = Library.groupLabels(albums);
    await Promise.all([
      this._albums.drop(),
      this._labels.drop()
    ]);
    await Promise.all([
      this._albums.insert(albums),
      this._labels.insert(labels)
    ]);

    return ({ songs, albums, labels });
  }
}
