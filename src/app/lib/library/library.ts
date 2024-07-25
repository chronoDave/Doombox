/* eslint-disable max-len */
import type Parser from '../parser/parser';
import type { SubscriptionController } from '@doombox/types/ipc';
import type { Album, Label, Song } from '@doombox/types/library';

import fs from 'fs';
import LeafDB from 'leaf-db';
import pMap from 'p-map';
import path from 'path';
import sharp from 'sharp';

import group from '@doombox/lib/collection/group';
import EventEmitter from '@doombox/lib/eventEmitter/eventEmitter';
import levenshteinDistance from '@doombox/lib/string/levenshteinDistance';

export type LibraryProps = {
  root: string
  parser: Parser
  db: {
    song: LeafDB<Song>
    album: LeafDB<Album>
    label: LeafDB<Label>
  }
};

export type LibraryEvents = {
  file: (payload: SubscriptionController['parser']['file']) => void
  size: (payload: SubscriptionController['parser']['size']) => void
};

export default class Library extends EventEmitter<LibraryEvents> {
  private readonly _sizes = [96, 128, 192, 256, 384, 512] as const;
  private readonly _root: string;
  private readonly _parser: Parser;
  private readonly _db: {
    song: LeafDB<Song>
    album: LeafDB<Album>
    label: LeafDB<Label>
  };

  private _all() {
    return {
      songs: this._db.song.select({})
        .sort((a, b) => {
          if (!a.label || !b.label) return 0;
          if (a.label !== b.label) return a.label.localeCompare(b.label);
          if (!a.year || !b.year) return 0;
          if (a.year !== b.year) return a.year - b.year;
          if (!a.album || !b.album) return 0;
          if (a.album !== b.album) return a.album.localeCompare(b.album);
          if (!a.track.no || !b.track.no) return 0;
          return a.track.no - b.track.no;
        }),
      albums: this._db.album.select({})
        .sort((a, b) => {
          if (!a.label || !b.label) return 0;
          if (a.label !== b.label) return a.label.localeCompare(b.label);
          if (!a.year || !b.year) return 0;
          return a.year - b.year;
        }),
      labels: this._db.label.select({})
        .sort((a, b) => {
          if (!a.label || !b.label) return 0;
          return a.label.localeCompare(b.label);
        })
    };
  }

  private _image(id: string, size: number) {
    return path.join(this._root, `${id}-${size}.jpg`);
  }

  private _build(songs: Song[]) {
    this._db.song.insert(songs);

    this._db.album.drop();
    const albums = this._db.album.insert(Array.from(group(songs, 'album').values())
      .map(x => ({
        _id: LeafDB.id(),
        image: x[0].image,
        songs: x.map(song => song._id),
        duration: x.reduce((acc, cur) => acc + (cur.duration ?? 0), 0),
        album: x[0].album,
        albumartist: x[0].albumartist,
        label: x[0].label,
        date: x[0].date,
        year: x[0].year,
        cdid: x[0].cdid,
        romaji: {
          album: x[0].romaji.album,
          albumartist: x[0].romaji.albumartist,
          label: x[0].romaji.label
        }
      })));

    this._db.label.drop();
    const labels = this._db.label.insert(Array.from(group(albums, 'label').values())
      .map(x => ({
        _id: LeafDB.id(),
        albums: x.map(album => album._id),
        songs: x.map(album => album.songs).flat(),
        label: x[0].label!,
        duration: x.reduce((acc, cur) => acc + (cur.duration ?? 0), 0),
        romaji: {
          label: x[0].romaji.label
        }
      })));

    return { albums, labels };
  }

  constructor(props: LibraryProps) {
    super();

    this._db = props.db;
    this._parser = props.parser;
    this._root = props.root;

    this._parser.on('parse', file => this.emit('file', file));

    fs.mkdirSync(this._root, { recursive: true });
  }

  async insert(files: string[]) {
    this.emit('size', files.length);

    const { songs, images } = await this._parser.parse(files);
    const { albums, labels } = this._build(songs);

    this.emit('size', images.size);
    await pMap(images.entries(), ([src, id]) => {
      this.emit('file', id);

      return Promise.all(this._sizes.map(size => (
        sharp(Buffer.from(src, 'base64'))
          .jpeg({ progressive: true })
          .resize({ width: size, height: size })
          .toFile(this._image(id, size))
      )));
    }, { concurrency: 8 });

    return { songs, albums, labels };
  }

  select(query?: string) {
    if (!query) return this._all();

    const distance = (x: string | null) => x ?
      levenshteinDistance(x, query) :
      Number.MAX_SAFE_INTEGER;

    const songs = this._db.song.select(...[
      { title: { $text: query } },
      { artist: { $text: query } },
      { romaji: { title: { $text: query } } },
      { romaji: { artist: { $text: query } } }
    ]).sort((a, b) => {
      if (distance(a.title) !== distance(b.title)) return distance(a.title) - distance(b.title);
      if (distance(a.artist) !== distance(b.artist)) return distance(a.artist) - distance(b.artist);
      if (distance(a.romaji.title) !== distance(b.romaji.title)) return distance(a.romaji.title) - distance(b.romaji.title);
      if (distance(a.romaji.artist) !== distance(b.romaji.artist)) return distance(a.romaji.artist) - distance(b.romaji.artist);

      return 1;
    });

    const albums = this._db.album.select(...[
      { album: { $text: query } },
      { albumartist: { $text: query } },
      { romaji: { album: { $text: query } } },
      { romaji: { albumartist: { $text: query } } }
    ]).sort((a, b) => {
      if (distance(a.album) !== distance(b.album)) return distance(a.album) - distance(b.album);
      if (distance(a.albumartist) !== distance(b.albumartist)) return distance(a.albumartist) - distance(b.albumartist);
      if (distance(a.romaji.album) !== distance(b.romaji.album)) return distance(a.romaji.album) - distance(b.romaji.album);
      if (distance(a.romaji.albumartist) !== distance(b.romaji.albumartist)) return distance(a.romaji.albumartist) - distance(b.romaji.albumartist);

      return 1;
    });

    const labels = this._db.label.select(...[
      { label: { $text: query } },
      { romaji: { label: { $text: query } } }
    ]).sort((a, b) => {
      if (distance(a.label) !== distance(b.label)) return distance(a.label) - distance(b.label);
      if (distance(a.romaji.label) !== distance(b.romaji.label)) return distance(a.romaji.label) - distance(b.romaji.label);

      return 1;
    });

    return { songs, albums, labels };
  }

  async remove(ids: string[]) {
    const queries = ids.map(_id => ({ _id }));
    const stale = this._db.song.select(...queries);
    const images = group(stale, 'image');

    await pMap(
      Array.from(images.keys()).filter(x => x),
      id => Promise.all(this._sizes.map(size => fs.rmSync(this._image(id!, size))))
    );

    this._db.song.delete(...queries);

    const songs = this._db.song.select({});
    const { albums, labels } = this._build(songs);

    return { songs, albums, labels };
  }

  drop() {
    this._db.song.drop();
    this._db.album.drop();
    this._db.label.drop();

    fs.rmSync(this._root, { recursive: true, force: true });
    fs.mkdirSync(this._root, { recursive: true });
  }
}
