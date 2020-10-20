/**
 * Sort songs by track
 * @param {object} a - Song
 * @param {object} b - Song
 */
export const sortByTrack = (a, b) => {
  if (a.metadata.track.no < b.metadata.track.no) return -1;
  if (a.metadata.track.no > b.metadata.track.no) return 1;
  return 0;
};
