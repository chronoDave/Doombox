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
  if (!path) return null;
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
export const sortLibrary = library => library
  .sort((a, b) => {
    if (a.metadata.albumartist < b.metadata.albumartist) return -1;
    if (a.metadata.albumartist > b.metadata.albumartist) return 1;
    if (a.metadata.year < b.metadata.year) return -1;
    if (a.metadata.year > b.metadata.year) return 1;
    if (a.metadata.track.no < b.metadata.track.no) return -1;
    if (a.metadata.track.no > b.metadata.track.no) return 1;
    return 0;
  });

// Electron
const { remote: { dialog: { showOpenDialog } } } = window.require('electron');

export const selectFolder = multi => {
  const properties = ['openDirectory'];
  if (multi) properties.push('multiSelections');

  return showOpenDialog({ properties })
    .then(({ canceled, filePaths }) => Promise.resolve(canceled ? null : filePaths))
    .catch(err => Promise.reject(err));
};
