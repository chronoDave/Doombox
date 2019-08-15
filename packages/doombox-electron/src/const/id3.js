const ID3_PICTURE_TYPES = [
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

const ID3_LANG_FRAMES = ['USLT', 'SYLT', 'COMM', 'USER'];
const ID3_FRAME_BLACKLIST = ['COMM', 'USLT', 'TXXX'];

module.exports = {
  ID3_PICTURE_TYPES,
  ID3_LANG_FRAMES,
  ID3_FRAME_BLACKLIST
};
