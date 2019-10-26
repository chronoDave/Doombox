const yup = require('yup');
const {
  validationString,
  validationNumber,
  validationFile
} = require('../types/locale');

const shapeUsername = yup.string()
  .max(30, validationString('max'));
const shapeLastModified = yup.number()
  .positive(validationNumber('positive'));
const shapeFileImage = yup.string()
  .matches(/(png|jpeg|jpg|gif)/i, validationFile('image'));
const shapeFileAudio = yup.string()
  .matches(/(mp3|flac)/, validationFile('audio'));
const shapeSize = yup.number()
  .positive(validationNumber('positive'));
const shapeTypeImage = yup.string()
  .matches(/(image\/(png|jpg|jpeg|gif))/, validationFile('image'));

module.exports = {
  shapeUsername,
  shapeLastModified,
  shapeFileImage,
  shapeFileAudio,
  shapeSize,
  shapeTypeImage
};
