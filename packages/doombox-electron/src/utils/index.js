const groupby = require('lodash.groupby');

// General
const cleanFileName = string => string
  .replace(/\/|\\|\*|\?|"|:|<|>|\.|\|/g, '_');
const arrayToObject = (key, array) => array
  .reduce((acc, cur) => ({
    ...acc,
    [cur[key]]: { ...cur }
  }), {});
const stripKeys = object => Object.keys(object)
  .filter(key => !(object[key] === undefined || object[key] === null))
  .reduce((acc, cur) => ({
    ...acc,
    [cur]: object[cur]
  }), {});

/**
 * @param {Object} logic
 * @param {String} logic.operator - Logical operator. Currently supports: `or`, `and`
 * @param {string[]} logic.expressions - Array of expressions.
 * - Uses { key: '', expression: '' } format.
 */
const createLogicQuery = ({ operator, expressions }) => {
  if (!['or', 'and'].includes(operator)) throw new Error(`Invalid operator: ${operator}`);
  if (!Array.isArray(expressions)) throw new Error(`${JSON.stringify(expressions)} is not an array`);
  return ({
    [`$${operator}`]: expressions.map(({ key, expression }) => ({
      [key]: { $regex: new RegExp(expression, 'i') }
    }))
  });
};

// Library
const populateImages = (collection, images) => collection
  .map(song => ({
    ...song,
    images: song.images ? song.images.map(id => images[id]) : []
  }));

// Transform
const transformLibrary = (library, images, sort) => Object
  .entries(groupby(library, 'metadata.album'))
  .sort((a, b) => {
    const aMetadata = a[1][0].metadata;
    const bMetadata = b[1][0].metadata;

    if (aMetadata[sort] < bMetadata[sort]) return -1;
    if (aMetadata[sort] > bMetadata[sort]) return 1;
    if (aMetadata.year < bMetadata.year) return -1;
    if (aMetadata.year > bMetadata.year) return 1;
    return 0;
  })
  .map(([album, values]) => ({
    [album]: {
      ...values
        .map(song => ({
          ...song,
          images: song.images ? song.images.map(id => images[id]) : []
        }))
        .sort((a, b) => {
          if (a.metadata.track.no < b.metadata.track.no) return -1;
          if (a.metadata.track.no > b.metadata.track.no) return 1;
          return 0;
        })
    }
  }));

const transformLibraryDivider = item => {
  const songs = Object.values(item)[0];
  const {
    metadata: {
      album,
      albumartist,
      year
    }
  } = songs[0];

  return [
    {
      divider: {
        album,
        albumartist,
        year,
        duration: Object
          .values(songs)
          .reduce((acc, cur) => acc + cur.format.duration, 0),
        collection: Object.values(songs)
      }
    },
    ...Object.values(songs)
  ];
};

const transformLabel = (library, images) => Object
  .entries(groupby(library, 'metadata.albumartist'))
  .sort((a, b) => {
    const aAlbumartist = a[1][0].metadata.albumartist.toLowerCase();
    const bAlbumartist = b[1][0].metadata.albumartist.toLowerCase();

    if (aAlbumartist < bAlbumartist) return -1;
    if (aAlbumartist > bAlbumartist) return 1;
    return 0;
  })
  .map(([albumartist, songs]) => ({
    albumartist,
    albums: Object
      .entries(groupby(songs, 'metadata.album'))
      .sort((a, b) => {
        const aMetadata = a[1][0].metadata;
        const bMetadata = b[1][0].metadata;

        if (aMetadata.year < bMetadata.year) return -1;
        if (aMetadata.year > bMetadata.year) return 1;
        if (aMetadata.album < bMetadata.album.toLowerCase()) return -1;
        if (aMetadata.album > bMetadata.album.toLowerCase()) return 1;
        return 0;
      })
      .map(([album, tracks]) => ({
        album,
        cover: tracks[0].images ? images[tracks[0].images[0]] : null,
        songs: tracks
          .map(song => ({
            ...song,
            images: song.images ? song.images.map(id => images[id]) : []
          }))
          .sort((a, b) => a.metadata.track.no - b.metadata.track.no)
      }))
  }));

module.exports = {
  arrayToObject,
  stripKeys,
  cleanFileName,
  createLogicQuery,
  transformLibrary,
  transformLibraryDivider,
  transformLabel,
  populateImages
};
