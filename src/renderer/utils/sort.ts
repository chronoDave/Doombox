import type { Album, Label, Song } from '../../types/library';

export const sortSongs = (a: Song, b: Song) => {
  if (!a.label || !b.label) return 0;
  if (a.label !== b.label) return a.label.localeCompare(b.label);
  if (!a.year || !b.year) return 0;
  if (a.year !== b.year) return a.year - b.year;
  if (!a.album || !b.album) return 0;
  if (a.album !== b.album) return a.album.localeCompare(b.album);
  if (!a.track.no || !b.track.no) return 0;
  return a.track.no - b.track.no;
};

export const sortAlbums = (a: Album, b: Album) => {
  if (!a.label || !b.label) return 0;
  if (a.label !== b.label) return a.label.localeCompare(b.label);
  if (!a.year || !b.year) return 0;
  return a.year - b.year;
};

export const sortLabels = (a: Label, b: Label) => {
  if (!a.label || !b.label) return 0;
  return a.label.localeCompare(b.label);
};
