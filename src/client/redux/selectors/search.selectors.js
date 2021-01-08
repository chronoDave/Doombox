import { sortMetadata } from '@doombox-utils';

export const populateSearchLabels = state => state.search.labels.list
  .map(label => ({
    ...label,
    songs: label.songs
      .map(id => {
        const song = state.entities.songs.map[id];

        if (!song) return null;
        return ({
          ...song,
          images: song.images.map(imageId => state.entities.images.map[imageId])
        });
      })
      .filter(song => song)
      .sort(sortMetadata(
        ['date', 'year', 'disc', 'track'],
        state.config.display.useLocalizedMetadata
      )),
  }))
  .sort(sortMetadata(['publisher'], state.config.display.useLocalizedMetadata));

export const populateSearchAlbums = state => state.search.albums.list
  .map(album => ({
    ...album,
    songs: album.songs
      .map(id => {
        const song = state.entities.songs.map[id];

        if (!song) return null;
        return ({
          ...song,
          images: song.images.map(imageId => state.entities.images.map[imageId])
        });
      })
      .filter(song => song)
      .sort(sortMetadata(
        ['date', 'year', 'disc', 'track'],
        state.config.display.useLocalizedMetadata
      )),
  }))
  .sort(sortMetadata(
    ['album', 'albumartist'],
    state.config.display.useLocalizedMetadata
  ));

export const populateSearchSongs = state => state.search.songs.list
  .map(song => {
    if (!song) return null;
    return ({
      ...song,
      images: song.images.map(imageId => state.entities.images.map[imageId])
    });
  })
  .filter(song => song)
  .sort(sortMetadata(
    ['title', 'artist'],
    state.config.display.useLocalizedMetadata
  ));
