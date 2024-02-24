import type { Album, Label, Song } from '../../types/library';

import levenshteinDistance from '../../lib/string/levenshteinDistance';

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

export const sortDistanceSongs = (query: string) => (a: Song, b: Song) => {
  const distance = (x: Song) => x.title ?
    levenshteinDistance(x.title, query) :
    Number.MAX_SAFE_INTEGER;

  return distance(a) - distance(b);
};

export const sortDistanceAlbums = (query: string) => (a: Album, b: Album) => {
  const distance = (x: Album) => x.album ?
    levenshteinDistance(x.album, query) :
    Number.MAX_SAFE_INTEGER;

  return distance(a) - distance(b);
};

export const sortDistanceLabels = (query: string) => (a: Label, b: Label) => {
  const distance = (x: Label) => x.label ?
    levenshteinDistance(x.label, query) :
    Number.MAX_SAFE_INTEGER;

  return distance(a) - distance(b);
};
