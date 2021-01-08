import { createCachedSelector } from 're-reselect';
import { sortMetadata } from '@doombox-utils';

const getSongMap = state => state.entities.songs.map;
const getAlbumMap = state => state.entities.albums.map;
const getImageMap = state => state.entities.images.map;
const getLabel = (state, props) => state.entities.labels.map[props.id];

const getUseLocalizedMetadata = state => state.config.display.useLocalizedMetadata;

export const populateLabel = createCachedSelector(
  [getLabel, getAlbumMap, getSongMap, getImageMap, getUseLocalizedMetadata],
  (label, albumMap, songMap, imageMap, useLocalizedMetadata) => {
    if (!label) return null;
    return ({
      ...label,
      songs: label.songs
        .map(id => {
          const song = songMap[id];

          if (!song) return null;
          return ({
            ...song,
            images: song.images.map(imageId => imageMap[imageId]),
          });
        })
        .filter(song => song)
        .sort(sortMetadata(
          ['date', 'year', 'disc', 'track'],
          useLocalizedMetadata
        )),
      albums: label.albums
        .map(id => {
          const album = albumMap[id];

          if (!album) return null;
          return ({
            ...album,
            images: album.images.map(imageId => imageMap[imageId]),
            songs: album.songs
              .map(songId => {
                const song = songMap[songId];

                if (!song) return null;
                return ({
                  ...song,
                  images: song.images.map(imageId => imageMap[imageId]),
                });
              })
              .filter(song => song)
              .sort(sortMetadata(['disc', 'track'], useLocalizedMetadata))
          });
        })
        .filter(album => album)
        .sort(sortMetadata(['date', 'year'], useLocalizedMetadata))
    });
  }
)((state, props) => props.id);
