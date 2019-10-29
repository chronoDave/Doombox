const yup = require('yup');
const {
  validationRequired,
  validationNumber
} = require('../types/locale');
const {
  shapeUsername,
  shapeFileImage,
  shapeTypeImage,
  shapeFileAudio
} = require('./shapes');

const schemaImage = yup.object().shape({
  _id: yup.string()
    .required(validationRequired),
  path: shapeFileImage
    .required(validationRequired),
  picture: yup.string(),
  description: yup.string(),
  lastModified: yup.number()
    .positive(validationNumber('positive')),
  lastModifiedDate: yup.date(),
  name: shapeFileImage,
  size: yup.number()
    .positive(validationNumber('positive')),
  type: shapeTypeImage
});

const schemaFormat = yup.object().shape({
  container: yup.string(),
  codec: yup.string(),
  codecProfile: yup.string(),
  tagTypes: yup.array(yup.string()),
  duration: yup.number()
    .positive(validationNumber('positive')),
  bitrate: yup.number()
    .positive(validationNumber('positive')),
  sampleRate: yup.number()
    .positive(validationNumber('positive')),
  bitsPerSample: yup.number()
    .positive(validationNumber('positive')),
  lossless: yup.boolean(),
  numberOfChannels: yup.number()
    .positive(validationNumber('positive')),
  numberOfSamples: yup.number()
    .positive(validationNumber('positive'))
});

const schemaSong = yup.object().shape({
  _id: yup.string()
    .required(validationRequired),
  images: yup.array(yup.string()),
  file: shapeFileAudio
    .required(validationRequired),
  format: schemaFormat
    .default(null)
    .nullable(),
  album: yup.string()
    .required(validationRequired),
  albumartist: yup.string()
    .required(validationRequired),
  title: yup.string()
    .required(validationRequired),
  artist: yup.string()
    .required(validationRequired),
  year: yup.number()
    .positive(validationNumber('positive'))
    .required(validationRequired)
});

const schemaLibrary = yup.array(schemaSong);

const schemaPlaylist = yup.object().shape({
  _id: yup.string()
    .required(validationRequired),
  title: shapeUsername
    .required(validationRequired),
  image: schemaImage
    .default(null)
    .nullable(),
  songs: yup.array(schemaSong)
});

const schemaUser = yup.object().shape({
  avatar: schemaImage
    .default(null)
    .nullable(),
  background: schemaImage
    .default(null)
    .nullable(),
  folders: yup.array(yup.object().shape({
    path: yup.string()
      .required(validationRequired)
  })),
  playlist: yup.array(schemaPlaylist),
  language: yup.string()
    .required(validationRequired),
  username: shapeUsername
    .required(validationRequired),
  _id: yup.string()
    .required(validationRequired)
});

module.exports = {
  schemaImage,
  schemaSong,
  schemaLibrary,
  schemaUser,
  schemaPlaylist
};
