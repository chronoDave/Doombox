// General
export const isEmptyObj = obj => Object.keys(obj).length === 0;
export const normalizeUrl = url => url
  .replace(/#/g, '%23')
  .replace(/\\/g, '\\\\');
export const getRandomInt = (min, max) => (
  Math.floor(Math.random() * (max - min + 1) + min)
);

// Locale
export const languages = ['us', 'uk', 'nl'];

// Electron
export const selectFolder = multi => {
  const {
    remote: { dialog: { showOpenDialog } }
  } = window.require('electron');

  const properties = ['openDirectory'];
  if (multi) properties.push('multiSelections');

  return new Promise(resolve => {
    showOpenDialog({ properties }, filePaths => {
      if (!filePaths || filePaths.length === 0) {
        resolve(null);
      } else {
        resolve(filePaths[0]);
      }
    });
  });
};
