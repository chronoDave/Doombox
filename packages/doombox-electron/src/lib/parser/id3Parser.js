const fs = require('fs');

// Utils
const {
  synchToInt,
  readStringFromBuffer,
  stringLengthFromView,
  removeZeroPadding,
  writeImage
} = require('./utils');

class ID3Parser {
  constructor(config = {}, db) {
    this.config = config;
    this.db = db;

    this.headerSize = 10; // ID3v2 Metadata Header
    this.langFrames = ['USLT', 'SYLT', 'COMM', 'USER'];
    this.urlFrames = [
      'WCOM',
      'WCOP',
      'WOAF',
      'WOAR',
      'WOAS',
      'WORS',
      'WPAY',
      'WPUB'
    ];
    this.pictureTypes = [
      'Other',
      'Icon',
      'Other icon',
      'Cover (front)',
      'Cover (back)',
      'Leaflet page',
      'Media',
      'Lead artist / leader performer / soloist',
      'Artist / performer',
      'Conductor',
      'Band / orchestra',
      'Composer',
      'Lyricist / text writer',
      'Recording location',
      'During recording',
      'During performance',
      'Movie / video screen capture',
      'A bright coloured fish',
      'Illustration',
      'Band / artist logotype',
      'Publisher / studio logotype'
    ];
  }

  readImage(view, encoding) {
    let offset = 0;

    // MIME Type
    const mimeTypeLength = stringLengthFromView(view);
    const mimeType = readStringFromBuffer(0, new Uint8Array(
      view.buffer,
      view.byteOffset,
      mimeTypeLength
    ));
    offset += (mimeTypeLength + 1);

    // Picture Type
    const pictureTypeIndex = view.getUint8(offset);
    offset += 1;

    // Description
    const descriptionLength = stringLengthFromView(view, offset);
    const description = readStringFromBuffer(encoding, new Uint8Array(
      view.buffer,
      view.byteOffset + offset,
      descriptionLength
    ));
    offset += (descriptionLength + 1);

    // Data
    const pictureData = Buffer.from(
      view.buffer,
      view.byteOffset + offset,
      view.byteLength
    );

    return {
      mimeType,
      pictureType: this.pictureTypes[pictureTypeIndex],
      description,
      pictureData
    };
  }

  readFrame(buffer, offset) {
    const header = new DataView(buffer, offset, this.headerSize + 1);
    if (header.getUint8(0) <= 0) return null; // Last frame

    // Frame
    const id = readStringFromBuffer(0, new Uint8Array(buffer, offset, 4));
    const size = header.getUint32(4);
    const encoding = header.getUint8(this.headerSize);

    // Content
    let contentSize = size - 1;
    let contentOffset = offset + this.headerSize + 1;

    // URL
    if (this.urlFrames.includes(id)) {
      // No 0 termination on url frame strings
      contentSize += 1;
      contentOffset -= 1;
    }

    // Language
    let lang;
    if (this.langFrames.includes(id)) {
      lang = readStringFromBuffer(0, new Uint8Array(buffer, offset, 3));
      contentOffset += 3;
      contentSize -= 3;
    }

    // Value
    let value;
    if (id === 'APIC') {
      const imageView = new DataView(buffer, contentOffset, contentSize);
      value = this.readImage(imageView, encoding);
    } else {
      value = removeZeroPadding(readStringFromBuffer(
        encoding,
        new Uint8Array(buffer, contentOffset, contentSize)
      ));
    }

    return {
      id,
      lang,
      value,
      size: size + this.headerSize
    };
  }

  parse(file) {
    return new Promise((resolve, reject) => (
      fs.readFile(file, async (err, data) => {
        if (err) return reject(err);
        if (!data || !data.buffer) return reject(new Error());

        // ID3 Header
        const { buffer } = data;
        const header = new DataView(buffer, 0, this.headerSize);

        const versionMajor = header.getUint8(3);
        const versionMinor = header.getUint8(4);
        const version = `ID3v2.${versionMajor}.${versionMinor}`;

        // ID3 Size
        const size = synchToInt(header.getUint32(6)) + this.headerSize;

        // ID3 Frames
        let offset = this.headerSize;
        let payload = { version, images: [] };
        const images = [];

        // Parse frames
        while (offset < size) {
          const frame = this.readFrame(buffer, offset);
          if (!frame) break;

          if (frame.id === 'APIC') {
            images.push(frame.value);
          } else {
            payload = {
              ...payload,
              [frame.id]: frame.value
            };
          }

          offset += frame.size;
        }

        // Validate payload
        if (!payload.TALB || !payload.TIT2 || !payload.TPE1) {
          if (this.config.forceMetadata) {
            reject(new Error(`Missing metadata:\nTALB: ${payload.TALB}\nTIT2: ${payload.TIT2}\nTPE1: ${payload.TPE1}\nat ${file}`));
          } else {
            if (!payload.TALB) payload.TALB = 'Unknown';
            if (!payload.TIT2) payload.TIT2 = 'Unknown';
            if (!payload.TPE1) payload.TPE1 = 'Unknown';
          }
        }

        const _id = `${payload.TALB}-${payload.TPE1}-${payload.TIT2}-${payload.TRCK || 0}`;

        if (this.config.parseImage) {
          images.forEach(image => {
            const imageId = `${payload.TPE2}-${payload.TALB}-${image.pictureType}`;

            payload.images.push(imageId);

            writeImage({
              _id: imageId,
              db: this.db,
              image,
              config: this.config
            });
          });
        }

        return resolve({
          _id,
          path: file,
          ...payload
        });
      })
    ));
  }

  parseRecursive(files, event, iteration = 0) {
    if (!Array.isArray(files)) {
      throw new Error('Files is not an array');
    }

    const batches = Math.ceil(files.length / this.config.batchSize);
    const offset = this.config.batchSize * iteration;
    const newFiles = files.slice(offset, offset + this.config.batchSize);

    return Promise.all(newFiles.map(file => this.parse(file)))
      .then(async data => {
        if (iteration < batches) {
          event.handleMessage({ current: iteration + 1, total: batches });

          // Remove duplicates
          await this.db.create('library', [...new Set(data)]);
          this.parseRecursive(files, event, iteration + 1);
        } else {
          const payload = await this.db.read({ collection: 'library' });

          event.handleMessage({});
          event.handleSuccess(payload);
        }
      })
      .catch(err => {
        throw err;
      });
  }
}

module.exports = ID3Parser;
