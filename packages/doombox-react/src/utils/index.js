import groupBy from 'lodash.groupby';

// General
export const shuffleArray = array => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const shuffled = array.slice();

    for (let i = shuffled.length - 1; i >= 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const swap = shuffled[j];

      shuffled[j] = shuffled[i];
      shuffled[i] = swap;
    }

    if (shuffled.length <= 1 || shuffled.some((v, i) => v !== array[i])) {
      return shuffled;
    }
  }
};
export const zeroPadding = i => (i < 10 ? `0${i}` : i);
export const formatTime = (time, format) => {
  const seconds = Math.floor(time % 60);
  const minutes = Math.floor((time / 60) % 60);
  const hours = Math.floor(time / 3600);

  if (format === 'text') return `${hours > 0 ? `${hours} h ` : ''}${minutes} min`;
  return `${hours > 0 ? `${zeroPadding(hours)}:` : ''}${zeroPadding(minutes)}:${zeroPadding(seconds)}`;
};
export const pathToUrl = path => {
  if (typeof path !== 'string') return null;
  return path
    .replace(/#/g, '%23')
    .replace(/\\/g, '/');
};
export const pathToRemoteUrl = async path => new Promise((resolve, reject) => fetch(path)
  .then(response => response.blob())
  .then(blob => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  }));
export const cleanErr = errString => errString
  .replace(/\\/g, '/')
  .replace(/\n/g, ' ');

// Library
export const normalizeArtist = ({
  localized,
  artist,
  artistlocalized,
  artists,
  artistslocalized
}) => {
  if (localized && Array.isArray(artistslocalized)) return artistslocalized.join(',\u00a0');
  if (localized && artistlocalized) return artistlocalized;
  if (Array.isArray(artists)) return artists.join(',\u00a0');
  return artist;
};
export const sortLibrary = (a, b) => {
  const {
    metadata: {
      albumartist: aAlbumartist,
      album: aAlbum,
      year: aYear,
      track: { no: aTrackNo },
      disk: { no: aDiskNo }
    }
  } = a;
  const {
    metadata: {
      albumartist: bAlbumartist,
      album: bAlbum,
      year: bYear,
      track: { no: bTrackNo },
      disk: { no: bDiskNo }
    }
  } = b;

  const normalizeString = string => {
    if (!string) return 'unknown';
    return string.toLowerCase();
  };

  if (normalizeString(aAlbumartist) < normalizeString(bAlbumartist)) return -1;
  if (normalizeString(aAlbumartist) > normalizeString(bAlbumartist)) return 1;
  if (normalizeString(aAlbum) < normalizeString(bAlbum)) return -1;
  if (normalizeString(aAlbum) > normalizeString(bAlbum)) return 1;
  if (aYear < bYear) return -1;
  if (aYear > bYear) return 1;
  if (aDiskNo < bDiskNo) return -1;
  if (aDiskNo > bDiskNo) return 1;
  if (aTrackNo < bTrackNo) return -1;
  if (aTrackNo > bTrackNo) return 1;
  return 0;
};
export const sortTrackNo = (a, b) => {
  if (a.metadata.track.no < b.metadata.track.no) return -1;
  if (a.metadata.track.no > b.metadata.track.no) return 1;
  return 0;
};
export const getTotalDuration = tracks => Object
  .values(tracks)
  .reduce((acc, cur) => acc + cur.format.duration, 0);
export const createDividerDisc = tracks => Object
  .values(groupBy(tracks, 'metadata.disk.no'))
  .map((disc, index) => {
    const divider = {
      divider: 'disc',
      no: index + 1
    };

    return [divider, disc];
  })
  .flat();
export const createDividerAlbum = tracks => Object
  .values(groupBy(tracks, 'metadata.album'))
  .map(albumTracks => {
    const { metadata, images } = albumTracks[0];

    return ({
      ...metadata,
      cover: images[0] || null,
      duration: getTotalDuration(albumTracks),
      tracks: albumTracks.map(({ _id }) => _id)
    });
  })
  .sort((a, b) => {
    if (a.year < b.year) return -1;
    if (a.year > b.year) return 1;
    return 0;
  });

// Electron
const { remote: { dialog: { showOpenDialog } } } = window.require('electron');

export const selectFolder = ({ multi }) => {
  const properties = ['openDirectory'];
  if (multi) properties.push('multiSelections');

  return showOpenDialog({ properties })
    .then(({ canceled, filePaths }) => Promise.resolve(canceled ? null : filePaths))
    .catch(err => Promise.reject(err));
};
