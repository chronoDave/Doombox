import type { Album, Label, Song } from '../../types/library';
import LeafDB from 'leaf-db';
import sharp from 'sharp';
import path from 'path';
import pMap from 'p-map';
import group from '../../utils/collection/group';
import Parser, { ParserEvents } from './parser';
import { TypedEmitter } from 'tiny-typed-emitter';

export type LibraryOptions = {
  parser: Parser
  db: {
    songs: LeafDB<Song>,
    albums: LeafDB<Album>,
    labels: LeafDB<Label>
  }
}

export type LibraryEvents = {
  insert: (event: { image: string, total: number }) => void
  parse: ParserEvents['parse']
};

export default class Library extends TypedEmitter<LibraryEvents> {
  private readonly _songs: LeafDB<Song>
  private readonly _albums: LeafDB<Album>
  private readonly _labels: LeafDB<Label>
  private readonly _parser: Parser

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
      })
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
        })
      });
  }

  constructor(options: LibraryOptions) {
    super();

    this._songs = options.db.songs;
    this._albums = options.db.albums;
    this._labels = options.db.labels;
    this._parser = options.parser;

    this._parser.on('parse', event => this.emit('parse', event));
  }

  async insert(files: string[]) {
    const { songs, images } = await this._parser.parse(files);
    await pMap(images.entries(), ([b64, file]) => {
      this.emit('insert', { image: file, total: images.size })
      return sharp(Buffer.from(b64, 'base64'))
        .jpeg({ progressive: true })
        .toFile(file);
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
    return Promise.all([
      this._albums.insert(albums),
      this._labels.insert(labels)
    ]).then(([albums, labels]) => ({ songs, albums, labels }))
  }
}