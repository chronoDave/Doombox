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
export const formatTime = time => {
  const seconds = zeroPadding(Math.floor(time % 60));
  const minutes = zeroPadding(Math.floor((time / 60) % 60));
  const hours = zeroPadding(Math.floor((time / 3600) % 24));

  return `${hours === '00' ? '' : `${hours}:`}${minutes}:${seconds}`;
};
