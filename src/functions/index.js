export const getDurationFormat = raw => {
  const parsed = parseInt(raw, 10);

  const addZero = i => (i < 10 ? `0${i}` : i);

  const hours = addZero(Math.floor(parsed / 3600));
  const minutes = addZero(Math.floor((parsed % 3600) / 60));
  const seconds = addZero(Math.floor(parsed % 60));

  if (hours === '00') return `${minutes}:${seconds}`;
  return `${hours}:${minutes}:${seconds}`;
};

export const shuffleArray = array => array
  .map(a => [Math.random(), a])
  .sort((a, b) => a[0] - b[0])
  .map(a => a[1]);
