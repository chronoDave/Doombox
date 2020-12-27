const fs = require('fs');
const path = require('path');

const walk = require('@chronocide/fs-walk').default;
const sharp = require('sharp');
const groupBy = require('lodash.groupby');
const { parseFile } = require('music-metadata');

const { toArray, generateUid } = require('@doombox-utils');
const { IPC, TYPES } = require('@doombox-utils/types');

module.exports = class LibraryController {
  /**
   * @param {object} db - Database object
   * @param {string} folder - Image folder
   * @param {object} options
   * @param {boolean} options.strict - Is strict mode enabled
   * @param {string[]} options.fileTypes - Allowed file types
   * @param {boolean} options.skipCovers - Should parser skip covers
   * @param {string[]} options.requiredMetadata - Required metadata
   * @param {string[]} options.tagTypes - Mp3 metadata tags
   */
  constructor(db, folder, {
    strict,
    fileTypes,
    skipCovers,
    requiredMetadata,
    tagTypes
  } = {}) {
    this.db = db;
    this.folder = {};
    this.strict = strict;
    this.fileTypes = fileTypes;
    this.skipCovers = skipCovers;
    this.requiredMetadata = requiredMetadata;
    this.tagTypes = tagTypes;

    if (folder) {
      this.folder.root = folder;
      this.folder.original = path.resolve(folder, 'original');
      this.folder.thumbnail = path.resolve(folder, 'thumbnail');

      fs.mkdirSync(this.folder.original, { recursive: true });
      fs.mkdirSync(this.folder.thumbnail, { recursive: true });
    }

    this.getNativeTags = this.getNativeTags.bind(this);
    this.parseMetadata = this.parseMetadata.bind(this);
    this.createImages = this.createImages.bind(this);
    this.insert = this.insert.bind(this);
    this.find = this.find.bind(this);
    this.drop = this.drop.bind(this);

    this.cache = [];
  }

  getNativeTags(native) {
    for (let i = 0; i < this.tagTypes.length; i += 1) {
      const nativeTagArray = native[this.tagTypes[i]];

      if (nativeTagArray) {
        const nativeTags = { APIC: [], COMM: [] };

        for (let j = 0; j < nativeTagArray.length; j += 1) {
          const nativeTag = nativeTagArray[j];
          const id = nativeTag.id.toUpperCase();

          if (['APIC', 'COMM'].includes(id)) {
            nativeTags[id].push(nativeTag.value);
          } else {
            nativeTags[id] = nativeTag.value;
          }
        }

        return nativeTags;
      }
    }

    return null;
  }

  async parseMetadata(file) {
    const { format, native } = await parseFile(file, { skipCovers: this.skipCovers });

    const nativeTags = this.getNativeTags(native);
    if (!nativeTags) {
      return Promise.reject(new Error([
        'File does not have valid tags',
        `File: ${file}`,
        `Expected tags: ${this.tagTypes}`,
        `Actual tags: ${Object.keys(native)}`
      ].join('\n')));
    }
    if (
      this.requiredMetadata.length > 0 &&
      !Object.keys(nativeTags).some(key => this.requiredMetadata.includes(key))
    ) {
      return Promise.reject(new Error([
        `File does not have all required metadata: ${file}`,
        `File: ${file}`,
        `Expected metadata: ${this.requiredMetadata}`,
        `Actual metadata: ${Object.keys(nativeTags)}`
      ].join(', ')));
    }

    const getTagSet = tag => {
      if (!tag) return [-1, -1];

      const set = tag
        .split(/\/|\\|\.|-/)
        .map(value => parseInt(value, 10));

      if (set.length !== 2) return [set[0] || -1, set[1] || -1];
      return set;
    };

    return Promise.resolve({
      _id: generateUid(),
      _albumId: generateUid(`${nativeTags.TPUB || 'Unknown'}${nativeTags.TALB || 'Unknown'}`),
      _labelId: generateUid(nativeTags.TPUB || 'Unknown'),
      file,
      duration: format.duration,
      images: nativeTags.APIC.map(image => ({
        format: image.format.split('/').pop(), // image/jpg => jpg
        description: image.description || null,
        type: image.type,
        data: image.data
      })),
      artist: nativeTags.TPE1 || null,
      title: nativeTags.TIT2 || null,
      album: nativeTags.TALB || null,
      albumartist: nativeTags.TPE2 || null,
      publisher: nativeTags.TPUB || null,
      track: getTagSet(nativeTags.TRCK),
      disc: getTagSet(nativeTags.TPOS),
      year: nativeTags.TYER ?
        parseInt(nativeTags.TYER, 10) :
        null,
      artistlocalized: nativeTags['TXXX:ARTISTLOCALIZED'] || null,
      titlelocalized: nativeTags['TXXX:TITLELOCALIZED'] || null,
      albumlocalized: nativeTags['TXXX:ALBUMLOCALIZED'] || null,
      albumartistlocalized: nativeTags['TXXX:ALBUMARTISTLOCALIZED'] || null,
      publisherlocalized: nativeTags['TXXX:PUBLISHERLOCALIZED'] || null,
      date: nativeTags.TDAT || null,
      event: nativeTags['TXXX:EVENT'] || null,
      genre: nativeTags.TCON || null,
      cdid: nativeTags['TXXX:CDID'] || nativeTags['TXXX:CATALOGID'] || null
    });
  }

  async createImages(images, _id) {
    const ids = [];

    for (let i = 0; i < images.length; i += 1) {
      const image = images[i];

      const cache = this.cache.find(element => element.data.equals(image.data));
      if (cache) {
        // Existing image
        ids.push(cache._id);
      } else {
        // New image
        this.cache.push({ _id, data: image.data });

        const file = `${_id}.${image.format}`;
        const original = path.resolve(this.folder.original, file);
        const thumbnail = path.resolve(this.folder.thumbnail, file);

        await Promise.all([
          this.db[TYPES.DATABASE.IMAGES].insert({
            _id,
            files: {
              original,
              thumbnail
            },
            type: image.type,
            description: image.description
          }),
          sharp(image.data)
            .jpeg({ progressive: true, quality: 100 })
            .toFile(original),
          sharp(image.data)
            .jpeg({ quality: 90 })
            .resize(300)
            .toFile(thumbnail)
        ]);

        ids.push(_id);
      }
    }

    return Promise.resolve(ids);
  }

  async insert(event, { payload }) {
    const files = toArray(payload)
      .map(walk)
      .flat()
      .filter(file => this.fileTypes.some(fileType => file.includes(fileType)));

    for (let i = 0, total = files.length; i < total; i += 1) {
      try {
        const metadata = await this.parseMetadata(files[i]);

        if (metadata.images.length > 0) {
          metadata.images = await this.createImages(metadata.images, metadata._id);
        }

        await this.db[TYPES.DATABASE.SONGS].insert(metadata);

        event.sender.send(IPC.CHANNEL.SCAN, {
          data: { file: metadata.file, index: i + 1, total },
          error: null
        });
      } catch (err) {
        event.sender.send(IPC.CHANNEL.SCAN, {
          data: { file: files[i], index: i + 1, total },
          error: this.strict ? err : null
        });

        if (this.strict) return Promise.reject(err);
      }
    }

    this.cache = [];

    const songs = await this.db[TYPES.DATABASE.SONGS].find();
    const albums = Object
      .entries(groupBy(songs, '_albumId'))
      .map(([album, albumSongs]) => ({
        _id: album,
        album: albumSongs[0].album || null,
        albumlocalized: albumSongs[0].albumlocalized || null,
        albumartist: albumSongs[0].albumartist || null,
        albumartistlocalized: albumSongs[0].albumartistlocalized || null,
        images: albumSongs[0].images,
        year: albumSongs[0].year || null,
        date: albumSongs[0].date || null,
        cdid: albumSongs[0].cdid || null,
        songs: albumSongs.map(({ _id }) => _id),
        duration: albumSongs.reduce((acc, { duration }) => acc + duration, 0)
      }));
    const labels = Object
      .entries(groupBy(songs, '_labelId'))
      .map(([label, labelSongs]) => ({
        _id: label,
        publisher: labelSongs[0].publisher || null,
        publisherlocalized: labelSongs[0].publisherlocalized || null,
        albums: Object.keys(groupBy(labelSongs, '_albumId')),
        songs: labelSongs.map(({ _id }) => _id),
        duration: labelSongs.reduce((acc, { duration }) => acc + duration, 0)
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

    if (this.folder.root) walk(this.folder.root).forEach(fs.unlinkSync);

    return Promise.resolve({
      images: [],
      songs: [],
      albums: [],
      labels: []
    });
  }
};
