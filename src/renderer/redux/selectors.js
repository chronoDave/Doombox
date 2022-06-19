import { createSelector } from 'reselect';
import mapSort from 'mapsort';

import { getLevenshteinDistance, sortMetadata } from '../../utils';
import { localize } from '../../intl/intl';

export const getImages = (ids, imageMap) => {
  const images = [];

  for (let i = 0; i < ids.length; i += 1) {
    const image = imageMap[ids[i]];

    if (image) images.push(image);
  }

  return images;
};

export const getSongs = (ids, songMap, imageMap) => {
  const songs = [];

  for (let i = 0; i < ids.length; i += 1) {
    const song = typeof ids[i] === 'string' ?
      songMap[ids[i]] :
      ids[i];

    if (song) {
      songs.push({
        ...song,
        images: getImages(song.images, imageMap)
      });
    }
  }

  return songs;
};

export const getAlbums = (ids, songMap, albumMap, imageMap) => {
  const albums = [];

  for (let i = 0; i < ids.length; i += 1) {
    const album = typeof ids[i] === 'string' ?
      albumMap[ids[i]] :
      ids[i];

    if (album) {
      albums.push({
        ...album,
        images: getImages(album.images, imageMap),
        songs: getSongs(album.songs, songMap, imageMap)
      });
    }
  }

  return albums;
};

export const getLabels = (
  ids,
  songMap,
  albumMap,
  labelMap,
  imageMap
) => {
  const labels = [];

  for (let i = 0; i < ids.length; i += 1) {
    const label = typeof ids[i] === 'string' ?
      labelMap[ids[i]] :
      ids[i];

    if (label) {
      labels.push({
        ...label,
        albums: getAlbums(label.albums, songMap, albumMap, imageMap),
        songs: getSongs(label.songs, songMap, imageMap)
      });
    }
  }

  return labels;
};

export const populateLibrary = createSelector(
  state => state.entities.labels.list,
  state => state.search.query,
  state => state.config.display.useLocalizedMetadata,
  state => state.entities.songs.map,
  state => state.entities.albums.map,
  state => state.entities.labels.map,
  state => state.entities.images.map,
  (
    ids,
    query,
    useLocalizedMetadata,
    songMap,
    albumMap,
    labelMap,
    imageMap
  ) => getLabels(ids, songMap, albumMap, labelMap, imageMap)
    .sort(sortMetadata(['publisher'], useLocalizedMetadata))
);

export const populateLibraryMenu = createSelector(
  state => state.entities.songs.list,
  state => state.entities.songs.map,
  state => state.entities.images.map,
  (
    ids,
    songMap,
    imageMap
  ) => getSongs(ids, songMap, imageMap)
    .sort(sortMetadata(['albumartist', 'year', 'date', 'disc', 'track']))
);

export const populateSearchSongs = createSelector(
  state => state.search.songs,
  state => state.search.query,
  state => state.config.search.title,
  state => state.config.display.useLocalizedMetadata,
  state => state.entities.songs.map,
  state => state.entities.images.map,
  (
    ids,
    query,
    isSearchTitle,
    useLocalizedMetadata,
    songMap,
    imageMap
  ) => (mapSort(
    getSongs(ids, songMap, imageMap),
    song => getLevenshteinDistance(query, localize(
      song,
      isSearchTitle ?
        'title' :
        'artist',
      useLocalizedMetadata
    )),
    (a, b) => a - b
  ))
);

export const populateSearchAlbums = createSelector(
  state => state.search.albums,
  state => state.search.query,
  state => state.config.search.album,
  state => state.config.display.useLocalizedMetadata,
  state => state.entities.songs.map,
  state => state.entities.albums.map,
  state => state.entities.images.map,
  (
    ids,
    query,
    isSearchAlbum,
    useLocalizedMetadata,
    songMap,
    albumMap,
    imageMap
  ) => (mapSort(
    getAlbums(ids, songMap, albumMap, imageMap),
    album => getLevenshteinDistance(query, localize(
      album,
      isSearchAlbum ?
        'album' :
        'albumartist',
      useLocalizedMetadata
    )),
    (a, b) => a - b
  ))
);

export const populateSearchLabels = createSelector(
  state => state.search.labels,
  state => state.search.query,
  state => state.config.display.useLocalizedMetadata,
  state => state.entities.songs.map,
  state => state.entities.albums.map,
  state => state.entities.labels.map,
  state => state.entities.images.map,
  (
    ids,
    query,
    useLocalizedMetadata,
    songMap,
    albumMap,
    labelMap,
    imageMap
  ) => (mapSort(
    getLabels(ids, songMap, albumMap, labelMap, imageMap),
    label => getLevenshteinDistance(query, localize(
      label,
      'publisher',
      useLocalizedMetadata
    )),
    (a, b) => a - b
  ))
);

export const populatePlaylists = createSelector(
  state => state.entities.playlists.list,
  state => state.entities.songs.map,
  state => state.entities.images.map,
  (playlists, songMap, imageMap) => playlists
    .map(({ collection, ...rest }) => ({
      collection: getSongs(collection, songMap, imageMap),
      ...rest
    }))
);
