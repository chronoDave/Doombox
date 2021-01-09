import { createCachedSelector } from 're-reselect';

export const populateImages = (state, ids) => {
  const images = [];

  for (let i = 0; i < ids.length; i += 1) {
    const image = state.entities.images.map[ids[i]];

    if (image) images.push(image);
  }

  return images;
};

export const populateSongs = (state, ids) => {
  const songs = [];

  for (let i = 0; i < ids.length; i += 1) {
    const song = state.entities.songs.map[ids[i]];

    if (song) songs.push(song);
  }

  return songs;
};

export const populateAlbums = (state, ids) => {
  const albums = [];

  for (let i = 0; i < ids.length; i += 1) {
    const album = state.entities.albums.map[ids[i]];

    if (album) {
      albums.push({
        ...album,
        images: populateImages(state, album.images),
        songs: populateSongs(state, album.songs)
      });
    }
  }

  return albums;
};

export const populateLabels = (state, ids) => {
  const labels = [];

  for (let i = 0; i < ids.length; i += 1) {
    const label = state.entities.labels.map[ids[i]];

    if (label) {
      labels.push({
        ...label,
        albums: populateAlbums(state, label.albums),
        songs: populateSongs(state, label.songs)
      });
    }
  }

  return labels;
};

export const populateLabel = createCachedSelector(
  [(state, props) => populateLabels(state, [props.id])],
  labels => labels[0]
)((state, props) => props.id);
