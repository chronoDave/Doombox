const fs = require('fs');
const path = require('path');

const groupBy = require('lodash.groupby');
const { parseFile } = require('music-metadata');

const { walk, toArray, generateUid } = require('@doombox-utils');
const { IPC, TYPES } = require('@doombox-utils/types');

module.exports = class LibraryController {
  /**
   * @param {object} db - Database object
   * @param {object} options
   * @param {string} options.folder - Image folder (default `null`)
   * @param {boolean} options.strict - Is strict mode enabled (default `false`)
   * @param {string[]} options.fileTypes - Allowed file types (default `['mp3']`)
   * @param {boolean} options.skipCovers - Should parser skip covers (default `false`)
   * @param {string[]} options.requiredMetadata - Required metadata (default `[]`)
   */
  constructor(db, {
    folder = null,
    strict = false,
    fileTypes = ['mp3'],
    skipCovers = false,
    requiredMetadata = []
  } = {}) {
    this.db = db;
    this.folder = folder;

    this.strict = strict;
    this.fileTypes = fileTypes;
    this.skipCovers = skipCovers;
    this.requiredMetadata = requiredMetadata;

    if (this.folder) fs.mkdirSync(this.folder, { recursive: true });

    this.parseMetadata = this.parseMetadata.bind(this);
    this.insertImages = this.insertImages.bind(this);
    this.insert = this.insert.bind(this);
    this.find = this.find.bind(this);
    this.drop = this.drop.bind(this);
  }

  async parseMetadata(file) {
    const {
      format,
      native,
      common: { picture, ...tags }
    } = await parseFile(file, { skipCovers: this.skipCovers });

    // Validation
    if (format.tagTypes.length === 0) return Promise.reject(new Error(`Corrupted file: ${file}`));
    if (
      this.requiredMetadata.length > 0 &&
      !Object.keys(tags).some(key => this.requiredMetadata.includes(key))
    ) return Promise.reject(new Error(`Missing metadata: ${this.requiredMetadata}, ${file}`));

    const nativeTags = native[format.tagTypes.sort().pop()]
      .reduce((acc, { id, value }) => ({
        ...acc,
        [id.toUpperCase()]: value
      }), {});
    const _albumId = generateUid(`${nativeTags.TPE2 || 'Unknown'}${nativeTags.TALB || 'Unknown'}` || 'Unknown');

    const getNoOfTag = tag => {
      const [_no, _of] = (tag || '').split(/\/|\\|\.|-/);

      return ({
        no: _no || 1,
        of: _of || 1
      });
    };

    return Promise.resolve({
      _albumId,
      _labelId: generateUid(nativeTags.TPE2 || 'Unknown'),
      file,
      format,
      images: !picture ? [] : picture.map(image => ({
        _id: _albumId,
        ...image,
        format: image.format.split('/').pop() // image/jpg => jpg
      })),
      metadata: {
        artist: nativeTags.TPE1 || null,
        title: nativeTags.TIT2 || null,
        album: nativeTags.TALB || null,
        albumartist: nativeTags.TPE2 || null,
        track: getNoOfTag(nativeTags.TRCK),
        disc: getNoOfTag(nativeTags.TPOS),
        year: nativeTags.TYER || null,
        artistlocalized: nativeTags['TXXX:ARTISTLOCALIZED'] || null,
        titlelocalized: nativeTags['TXXX:TITLELOCALIZED'] || null,
        albumlocalized: nativeTags['TXXX:ALBUMLOCALIZED'] || null,
        albumartistlocalized: nativeTags['TXXX:ALBUMARTISTLOCALIZED'] || null,
        date: nativeTags.TDAT || null,
        event: nativeTags['TXXX:EVENT'] || null,
        genre: nativeTags.TCON || null,
        cdid: toArray(
          tags.catalognumber ||
          nativeTags['TXXX:CATALOGID'] ||
          nativeTags['TXXX:CDID']
        ).filter(cdid => cdid)
      }
    });
  }

  async insertImages(images) {
    if (images.length <= 0 || !this.folder) return Promise.resolve([]);

    const ids = [];
    for (let i = 0; i < images.length; i += 1) {
      const { data, _id, ...rest } = images[i];
      const file = path.resolve(this.folder, `${_id}.${rest.format}`);

      ids.push(_id);

      try {
        await this.db[TYPES.DATABASE.IMAGES].insert({ _id, file, ...rest });
        fs.writeFileSync(file, data);
      } catch (err) {
        if (!err.message.includes('_id')) return Promise.reject(err);
      }
    }

    return Promise.resolve(ids);
  }

  async insert(event, { payload }) {
    const files = toArray(payload)
      .map(folder => walk(folder, this.fileTypes))
      .flat();

    for (let i = 0, total = files.length; i < total; i += 1) {
      try {
        const { images, ...rest } = await this.parseMetadata(files[i]);
        const covers = await this.insertImages(images);

        await this.db[TYPES.DATABASE.SONGS].insert({ covers, ...rest });

        event.sender.send(IPC.CHANNEL.INTERRUPT, {
          data: { file: rest.file, index: i + 1, total },
          error: null
        });
      } catch (err) {
        if (this.strict) return Promise.reject(err);
      }
    }

    const songs = await this.db[TYPES.DATABASE.SONGS].find();
    const albums = Object
      .entries(groupBy(songs, '_albumId'))
      .map(([album, albumSongs]) => ({
        _id: album,
        artists: [...new Set(albumSongs
          .map(({ metadata: { artist } }) => artist)
          .filter(artist => artist))],
        album: albumSongs[0].metadata.album || null,
        covers: albumSongs[0].covers,
        year: albumSongs[0].metadata.year || null,
        date: albumSongs[0].metadata.date || null,
        cdid: albumSongs[0].metadata.cdid || null,
        songs: albumSongs.map(({ _id }) => _id),
        duration: albumSongs.reduce((acc, { format: { duration } }) => acc + duration, 0)
      }));
    const labels = Object
      .entries(groupBy(songs, '_labelId'))
      .map(([label, labelSongs]) => ({
        _id: label,
        label: labelSongs[0].metadata.albumartist || null,
        albums: Object.keys(groupBy(labelSongs, '_albumId')),
        songs: labelSongs.map(({ _id }) => _id),
        duration: labelSongs.reduce((acc, { format: { duration } }) => acc + duration, 0)
      }));

    await this.db[TYPES.DATABASE.ALBUMS].insert(albums, { persist: true });
    await this.db[TYPES.DATABASE.LABELS].insert(labels, { persist: true });

    this.db[TYPES.DATABASE.SONGS].persist();
    this.db[TYPES.DATABASE.IMAGES].persist();

    return Promise.resolve();
  }

  async find(event, { query, projection }) {
    const songs = await this.db[TYPES.DATABASE.SONGS].find(query, projection);

    if (query && Object.keys(query).length !== 0) {
      const albumIds = [...new Set(songs.map(({ _albumId }) => _albumId))];
      const labelIds = [...new Set(songs.map(({ _labelId }) => _labelId))];

      const albums = await this.db[TYPES.DATABASE.ALBUMS].findById(albumIds);
      const labels = await this.db[TYPES.DATABASE.LABELS].findById(labelIds);

      return Promise.resolve({ songs, albums, labels });
    }

    const albums = await this.db[TYPES.DATABASE.ALBUMS].find();
    const labels = await this.db[TYPES.DATABASE.LABELS].find();

    return Promise.resolve({ songs, albums, labels });
  }

  async drop() {
    await this.db[TYPES.DATABASE.SONGS].drop();
    await this.db[TYPES.DATABASE.LABELS].drop();
    await this.db[TYPES.DATABASE.ALBUMS].drop();
    await this.db[TYPES.DATABASE.IMAGES].drop();

    if (this.folder) {
      const files = fs.readdirSync(this.folder);
      for (let i = 0; i < files.length; i += 1) {
        fs.unlinkSync(path.join(this.folder, files[i]));
      }
    }

    return Promise.resolve();
  }
};
