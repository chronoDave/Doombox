import { createCachedSelector } from 're-reselect';
import { sortMetadata } from '@doombox-utils';

const getSongMap = state => state.entities.songs.map;
const getAlbumMap = state => state.entities.albums.map;
const getImageMap = state => state.entities.images.map;
const getUseLocalizedMetadata = state => state.config.display.useLocalizedMetadata;

const getLabel = (state, props) => state.entities.labels.map[props.id];

export const populateLabel = createCachedSelector(
  [getLabel, getAlbumMap, getSongMap, getImageMap, getUseLocalizedMetadata],
  (label, albumMap, songMap, imageMap, useLocalizedMetadata) => {
    if (!label) return [];
    return ({
      ...label,
      songs: label.songs
        .map(id => songMap[id])
        .sort(sortMetadata(
          ['date', 'year', 'disc', 'track'],
          useLocalizedMetadata
        )),
      albums: label.albums
        .map(id => {
          const album = albumMap[id];

          if (!album) return ({ images: [], songs: [] });
          return ({
            ...album,
            images: album.images.map(imageId => imageMap[imageId]),
            songs: album.songs
              .map(songId => songMap[songId])
              .sort(sortMetadata(['disc', 'track'], useLocalizedMetadata))
          });
        })
        .sort(sortMetadata(['date', 'year'], useLocalizedMetadata))
    });
  }
)((state, props) => props.id);
