const fs = require('fs');
const path = require('path');

const sharp = require('sharp');
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

    this.imageCache = [];
  }

  async parseMetadata(file) {
    const { format, native, } = await parseFile(file, { skipCovers: this.skipCovers });

    const tagTypes = ['ID3v2.3', 'ID3v2.4'];
    if (!format.tagTypes.some(tagType => tagTypes.includes(tagType))) {
      return Promise.reject(new Error(`File does not contain valid metadata: ${file}`));
    }

    const nativeTags = tagTypes
      .map(tagType => {
        const tags = native[tagType];

        if (!tags) return null;
        return tags
          .reduce((acc, { id, value }) => ({
            ...acc,
            [id.toUpperCase()]: /apic/i.test(id) ?
              [...(acc[id] || []), value] :
              value
          }), {});
      })
      .sort()[0];

    if (
      this.requiredMetadata.length > 0 &&
      !Object.keys(nativeTags).some(key => this.requiredMetadata.includes(key))
    ) return Promise.reject(new Error(`Missing metadata: ${this.requiredMetadata}, ${file}`));

    const getTagSet = tag => {
      if (!tag) return [-1, -1];

      const set = tag
        .split(/\/|\\|\.|-/)
        .map(value => parseInt(value, 10));

      if (set.length !== 2) return [set[0] || -1, set[1] || -1];
      return set;
    };

    const joinTags = (...tags) => tags
      .map(tag => nativeTags[tag] || 'Unknown')
      .join();

    return Promise.resolve({
      _albumId: generateUid(joinTags('TPE2', 'TALB')),
      _labelId: generateUid(joinTags('TPE2')),
      file,
      format,
      images: !nativeTags.APIC ? [] : nativeTags.APIC.map(image => ({
        _id: generateUid(`${joinTags('TPE2', 'TALB')}${image.type}`),
        _songId: generateUid(nativeTags.TIT2 || 'Unknown'),
        ...image,
        format: image.format.split('/').pop() // image/jpg => jpg
      })),
      metadata: {
        artist: nativeTags.TPE1 || null,
        title: nativeTags.TIT2 || null,
        album: nativeTags.TALB || null,
        albumartist: nativeTags.TPE2 || null,
        track: getTagSet(nativeTags.TRCK),
        disc: getTagSet(nativeTags.TPOS),
        year: nativeTags.TYER ?
          parseInt(nativeTags.TYER, 10) :
          null,
        artistlocalized: nativeTags['TXXX:ARTISTLOCALIZED'] || null,
        titlelocalized: nativeTags['TXXX:TITLELOCALIZED'] || null,
        albumlocalized: nativeTags['TXXX:ALBUMLOCALIZED'] || null,
        albumartistlocalized: nativeTags['TXXX:ALBUMARTISTLOCALIZED'] || null,
        date: nativeTags.TDAT || null,
        event: nativeTags['TXXX:EVENT'] || null,
        genre: nativeTags.TCON || null,
        cdid: nativeTags['TXXX:CDID'] || nativeTags['TXXX:CATALOGID'] || null
      }
    });
  }

  async insertImages(images) {
    if (images.length <= 0 || !this.folder) return Promise.resolve([]);

    const ids = [];
    for (let i = 0; i < images.length; i += 1) {
      const {
        data,
        _id,
        _songId,
        ...image
      } = images[i];
      const file = path.resolve(this.folder, `${_id}.${image.format}`);

      if (this.imageCache.some(buffer => buffer.equals(data))) {
        // Existing image
        const _eId = `${_id}${_songId}`;

        await this.db[TYPES.DATABASE.IMAGES].insert({ _id: _eId, file, ...image });

        ids.push(_eId);
      } else {
        // Unique image
        this.imageCache.push(data);

        await this.db[TYPES.DATABASE.IMAGES].insert({ _id, file, ...image });
        await sharp(data)
          .jpeg({ quality: 90 })
          .resize(300)
          .toFile(file);

        ids.push(_id);
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

        event.sender.send(IPC.CHANNEL.SCAN, {
          data: { file: rest.file, index: i + 1, total },
          error: null
        });
      } catch (err) {
        if (this.strict) return Promise.reject(err);
      }
    }

    this.imageCache = [];

    const songs = await this.db[TYPES.DATABASE.SONGS].find();
    const albums = Object
      .entries(groupBy(songs, '_albumId'))
      .map(([album, albumSongs]) => ({
        _id: album,
        artist: albumSongs[0].metadata.artist || null,
        artistlocalized: albumSongs[0].metadata.artistlocalized || null,
        album: albumSongs[0].metadata.album || null,
        albumlocalized: albumSongs[0].metadata.albumlocalized || null,
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
        labellocalized: labelSongs[0].metadata.albumartistlocalized || null,
        albums: Object.keys(groupBy(labelSongs, '_albumId')),
        songs: labelSongs.map(({ _id }) => _id),
        duration: labelSongs.reduce((acc, { format: { duration } }) => acc + duration, 0)
      }));

    await this.db[TYPES.DATABASE.ALBUMS].insert(albums, { persist: true });
    await this.db[TYPES.DATABASE.LABELS].insert(labels, { persist: true });

    this.db[TYPES.DATABASE.SONGS].persist();
    this.db[TYPES.DATABASE.IMAGES].persist();

    const images = await this.db[TYPES.DATABASE.IMAGES].find();

    return Promise.resolve({
      images,
      songs,
      albums,
      labels
    });
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
    await this.db[TYPES.DATABASE.IMAGES].drop();
    await this.db[TYPES.DATABASE.SONGS].drop();
    await this.db[TYPES.DATABASE.LABELS].drop();
    await this.db[TYPES.DATABASE.ALBUMS].drop();

    if (this.folder) {
      const files = fs.readdirSync(this.folder);
      for (let i = 0; i < files.length; i += 1) {
        fs.unlinkSync(path.join(this.folder, files[i]));
      }
    }

    return Promise.resolve({
      images: [],
      songs: [],
      albums: [],
      labels: []
    });
  }
};
