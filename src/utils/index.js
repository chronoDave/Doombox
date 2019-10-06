/**
 * Convert time in ms to hh:mm:ss format
 *@param {number} time - Time in ms
*/
export const getDurationFormat = raw => {
  const timeInSeconds = raw / 1000;

  const seconds = Math.floor(timeInSeconds % 60);
  const minutes = Math.floor((timeInSeconds / 60) % 60);
  const hours = Math.floor((timeInSeconds / 3600) % 24);

  const addZero = i => (i < 10 ? `0${i}` : i);

  if (hours === 0) return `${addZero(minutes)}:${addZero(seconds)}`;
  return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
};

export const shuffleArray = array => {
  while (true) {
    let shuffled = array.slice();

    for (let i = shuffled.length - 1; i >= 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let swap = shuffled[j];
      shuffled[j] = shuffled[i];
      shuffled[i] = swap;
    }
      
    if (shuffled.length <= 1 || shuffled.some((v,i) => v != array[i])) {
      return shuffled;
    }
  }
}

export const cleanUrl = url => {
  const cleanedUrl = url.replace(/#/gi, '%23').replace(/\\/gi, '/');
  const splitUrl = cleanedUrl.split('.');

  if (splitUrl.length === 2) return cleanedUrl;

  return splitUrl.map((item, index) => {
    if (index < splitUrl.length - 2) return `${item}%2E`;
    if (index < splitUrl.length - 1) return `${item}.`;
    return item;
  }).join('');
};

export const escapeRegExp = query => query.replace(/[.*+?^${}()|[\]\\]/gi, '\\$&');
