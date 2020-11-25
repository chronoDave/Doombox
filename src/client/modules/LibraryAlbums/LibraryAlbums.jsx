import React from 'react';
import { formatTime } from '@doombox-utils';
import { IPC } from '@doombox-utils/types';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import {
  VirtualList,
  ButtonBase,
  Typography,
  Search
} from '../../components';

// Actions
import { ipcFind } from '../../actions';

// Hooks
import { useTranslation, useAudio, useMediaQuery } from '../../hooks';

// Styles
import useLibraryAlbumStyles from './LibraryAlbums.styles';

const LibraryAlbums = ({ songMap, labelMap, labels }) => {
  const { t } = useTranslation();
  const { set } = useAudio();
  const isSmall = useMediaQuery(breakpoints => breakpoints.create(
    breakpoints.queries.minWidth,
    breakpoints.values.sm
  ));

  const classes = useLibraryAlbumStyles();

  return (
    <div className={classes.root}>
      <Search
        onSearch={(_, value) => ipcFind(IPC.CHANNEL.LIBRARY, {
          $some: [
            { $stringLoose: { 'metadata.album': value.toString() } },
            { $stringLoose: { 'metadata.albumlocalized': value.toString() } },
            { $stringLoose: { 'metadata.albumartist': value.toString() } },
            { $stringLoose: { 'metadata.albumartistlocalized': value.toString() } }
          ]
        })}
        onChange={(_, value) => ipcFind(IPC.CHANNEL.LIBRARY, value.length === 0 ? {} : {
          $some: [
            { $stringLoose: { 'metadata.album': value.toString() } },
            { $stringLoose: { 'metadata.albumlocalized': value.toString() } },
            { $stringLoose: { 'metadata.albumartist': value.toString() } },
            { $stringLoose: { 'metadata.albumartistlocalized': value.toString() } }
          ]
        })}
      />
      <VirtualList
        data={labels}
        item={{
          height: ({ data, width }) => {
            const rows = Math.floor(width / 75);
            const columns = Math.ceil(data.albums.length / rows);

            return 35 + columns * 75;
          }
        }}
      >
        {({ data, style }) => {
          const labelPrimary = [
            `${data.albums.length} ${t('common.album', { plural: data.albums.length !== 1 })}`,
            `${data.songs.length} ${t('common.track', { plural: data.songs.length !== 1 })}`,
            formatTime(data.duration || 0)
          ].join(' \u2022 ');

          return (
            <div
              key={data._id}
              className={classes.itemRoot}
              style={style}
            >
              <ButtonBase
                className={classes.itemLabel}
                onClick={() => set({
                  name: data.label,
                  collection: labelMap[data._id].songs
                    .map(id => songMap[id])
                    .sort((a, b) => {
                      if (a.metadata.date && b.metadata.date) {
                        if (a.metadata.date < b.metadata.date) return -1;
                        if (a.metadata.date > b.metadata.date) return 1;
                      }
                      if (a.metadata.year < b.metadata.year) return -1;
                      if (a.metadata.disk.no < b.metadata.disk.no) return -1;
                      if (a.metadata.disk.no > b.metadata.disk.no) return 1;
                      if (a.metadata.track.no < b.metadata.track.no) return -1;
                      if (a.metadata.track.no > b.metadata.track.no) return 1;
                      return 0;
                    })
                })}
              >
                <Typography clamp>
                  {data.label || ''}
                </Typography>
                {!isSmall && (
                  <Typography clamp variant="caption">
                    {labelPrimary}
                  </Typography>
                )}
              </ButtonBase>
              <div className={classes.itemAlbums}>
                {data.albums.map(album => (
                  <ButtonBase
                    key={album._id}
                    className={classes.itemButton}
                    onClick={() => set({
                      name: album.album,
                      collection: album.songs
                        .map(id => songMap[id])
                        .sort((a, b) => {
                          if (a.metadata.disk.no < b.metadata.disk.no) return -1;
                          if (a.metadata.disk.no > b.metadata.disk.no) return 1;
                          if (a.metadata.track.no < b.metadata.track.no) return -1;
                          if (a.metadata.track.no > b.metadata.track.no) return 1;
                          return 0;
                        })
                    })}
                  >
                    <img
                      src={album.cover}
                      alt={album.album}
                      className={classes.itemCover}
                      decoding="async"
                    />
                  </ButtonBase>
                ))}
              </div>
            </div>
          );
        }}
      </VirtualList>
    </div>
  );
};

LibraryAlbums.propTypes = {
  songMap: PropTypes.shape({}).isRequired,
  labelMap: PropTypes.shape({}).isRequired,
  labels: PropTypes.arrayOf(PropTypes.shape({
    albums: PropTypes.arrayOf(PropTypes.shape({
      cover: PropTypes.string
    }))
  })).isRequired
};

const mapStateToProps = state => ({
  songMap: state.entities.songs.map,
  labelMap: state.entities.labels.map,
  labels: state.entities.labels.list
    .map(({ albums, ...restLabel }) => ({
      albums: albums
        .map(albumId => {
          const album = state.entities.albums.map[albumId];

          if (!album) return null;

          const { covers = [], ...restAlbum } = album;

          return ({
            cover: covers.map(coverId => {
              const image = state.entities.images.map[coverId];

              return image ? image.file : null;
            })[0],
            ...restAlbum
          });
        })
        .filter(album => album)
        .sort((a, b) => {
          if (a.date && b.date) {
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            return 0;
          }
          return a.year - b.year;
        }),
      ...restLabel
    }))
    .sort((a, b) => {
      if ((a.label || '').toLowerCase() < (b.label || '').toLowerCase()) return -1;
      if ((a.label || '').toLowerCase() > (b.label || '').toLowerCase()) return 1;
      return 0;
    })
});

export default connect(
  mapStateToProps,
  null,
  null,
  {
    areStatesEqual: (next, prev) => {
      const isEntityEqual = entity => new Set([
        ...Object.keys(next.entities[entity].map),
        ...Object.keys(prev.entities[entity].map)
      ]).size === Object.keys(prev.entities[entity].map);

      return (
        isEntityEqual('songs') &&
        isEntityEqual('albums') &&
        isEntityEqual('labels')
      );
    }
  }
)(LibraryAlbums);
