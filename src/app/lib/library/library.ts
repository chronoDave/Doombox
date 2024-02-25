import type { IpcRoute, IpcPayloadReceive } from '../../../types/ipc';
import type { Album, Label, Song } from '../../../types/library';
import type Parser from '../parser/parser';

import fs from 'fs';
import LeafDB from 'leaf-db';
import pMap from 'p-map';
import path from 'path';
import sharp from 'sharp';

import group from '../../../lib/collection/group';
import EventEmitter from '../../../lib/eventEmitter/eventEmitter';
import { sumSelect } from '../../../lib/math/sum';

export type LibraryProps = {
  parser: Parser
  root: string;
  db: {
    song: LeafDB<Song>
    album: LeafDB<Album>
    label: LeafDB<Label>
  };
};

export type LibraryEvents = {
  image: (payload: IpcPayloadReceive[IpcRoute.Image]) => void
  song: (payload: IpcPayloadReceive[IpcRoute.Song]) => void
};

export default class Library extends EventEmitter<LibraryEvents> {
  private readonly _db: {
    song: LeafDB<Song>
    album: LeafDB<Album>
    label: LeafDB<Label>
  };
  private readonly _root: string;
  private readonly _parser: Parser;

  private _insertImage(image: [b64: string, id: string]) {
    const root = path.join(this._root, image[1]);
    fs.mkdirSync(root);

    const writeImage = (size: number) => sharp(Buffer.from(image[0], 'base64'))
      .jpeg({ progressive: true })
      .resize({ width: size, height: size })
      .toFile(path.join(root, `${size}.jpg`));

    return Promise.all([96, 128, 192, 256, 384, 512].map(writeImage));
  }

  static groupAlbums(x: Song[]): Album[] {
    return Object.entries(group(x, 'album')).map(([album, songs]) => ({
      _id: LeafDB.id(),
      image: songs[0].image,
      songs: songs
        .sort((a, b) => {
          if (a.disc.no !== b.disc.no && a.disc.no && b.disc.no) {
            return a.disc.no - b.disc.no;
          }
          if (a.track.no !== b.track.no && a.track.no && b.track.no) {
            return a.track.no - b.track.no;
          }

          return 1;
        })
        .map(song => song._id),
      duration: sumSelect(songs, song => song.duration ?? 0),
      albumartist: songs[0].albumartist,
      album,
      label: songs[0].label,
      date: songs[0].date,
      year: songs[0].year,
      cdid: songs[0].cdid,
      romaji: {
        album: songs[0].romaji.album,
        albumartist: songs[0].romaji.albumartist,
        label: songs[0].romaji.label
      }
    }));
  }

  static groupLabels(x: Album[]): Label[] {
    return Object.entries(group(x, 'label')).map(([label, albums]) => ({
      _id: LeafDB.id(),
      albums: albums
        .sort((a, b) => {
          if (a.label !== b.label && a.label && b.label) {
            return a.label.localeCompare(b.label);
          }
          if (a.albumartist !== b.albumartist && a.albumartist && b.albumartist) {
            return a.albumartist.localeCompare(b.albumartist);
          }
          if (a.year !== b.year && a.year && b.year) {
            return a.year - b.year;
          }
          if (a.album !== b.album && a.album && b.album) {
            return a.album.localeCompare(b.album);
          }

          return 1;
        })
        .map(album => album._id),
      songs: albums
        .sort((a, b) => (
          (b.year ?? Number.MAX_SAFE_INTEGER) -
          (a.year ?? Number.MAX_SAFE_INTEGER)
        ))
        .map(album => album.songs)
        .flat(),
      label,
      duration: sumSelect(albums, album => album.duration ?? 0),
      romaji: {
        label: albums[0].romaji.label
      }
    }));
  }

  constructor(props: LibraryProps) {
    super();

    this._db = props.db;
    this._root = props.root;
    this._parser = props.parser;

    this._parser.on('parse', payload => this.emit('song', payload));

    fs.mkdirSync(this._root, { recursive: true });
  }

  songs() {
    return this._db.song.select({});
  }

  delete(ids: string[]) {
    return this._db.song.delete(...ids.map(_id => ({ _id })));
  }

  drop() {
    this._db.song.drop();
    this._db.album.drop();
    this._db.label.drop();

    fs.rmSync(this._root, { recursive: true, force: true });
    fs.mkdirSync(this._root, { recursive: true });
  }

  async all() {
    return Promise.all([
      this._db.song.select({}),
      this._db.album.select({}),
      this._db.label.select({})
    ]).then(([songs, albums, labels]) => ({ songs, albums, labels }));
  }

  async insert(files: string[]) {
    const { songs, images } = await this._parser.parse(files);
    await pMap(images.entries(), (image, i) => {
      this._insertImage(image);
      this.emit('image', {
        file: image[1],
        cur: i,
        size: images.size
      });
    }, { concurrency: 16 });

    const albums = Library.groupAlbums(songs);
    const labels = Library.groupLabels(albums);

    this._db.album.drop();
    this._db.label.drop();

    return ({
      songs: this._db.song.insert(songs),
      albums: this._db.album.insert(albums),
      labels: this._db.label.insert(labels)
    });
  }
}
