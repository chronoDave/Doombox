import type LeafDB from 'leaf-db';
import type { Image, Song } from '../../../types/library';
import type { ControllerProps } from './controller';

import parse from '../library/parse';
import scan from '../library/scan';

import Controller from './controller';

export type LibraryProps = ControllerProps & {
  db: {
    images: LeafDB<Image>,
    songs: LeafDB<Song>
  }
};

export default class LibraryController extends Controller {
  private readonly _db: {
    images: LeafDB<Image>,
    songs: LeafDB<Song>
  };

  constructor(props: LibraryProps) {
    super(props);

    this._db = props.db;
  }

  async scan(payload: { dir: string }) {
    const files = await scan(payload.dir);
    const { songs, pictures } = parse(files);

    const images: Image[] = Array.from(pictures, ([, _id]) => ({
      _id,
      original: `${_id}.jpg`,
      thumb: `thumbs/${_id}.jpg`
    }));

    await this._db.songs.insert(songs);
    await this._db.images.insert(images);

    return this._db.songs.find({});
  }
}
