import React from 'react';
import { formatTime } from '@doombox-utils';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { ButtonBase, Typography } from '../../components';

// Hooks
import { useTranslation, useAudio, useMediaQuery } from '../../hooks';

// Styles
import useLibraryAlbumStyles from './LibraryAlbums.styles';

const LibraryAlbums = ({ songsById, labelsById, labels }) => {
  const { t } = useTranslation();
  const { set } = useAudio();
  const classes = useLibraryAlbumStyles();

  const isSmall = useMediaQuery(({ breakpoints }) => breakpoints.create(
    breakpoints.directions.down,
    breakpoints.values.sm
  ));

  return (
    <div className={classes.root}>
      {labels.map(label => {
        const labelPrimary = [
          `${label.albums.length} ${t('common.album', { plural: label.albums.length !== 1 })}`,
          `${label.songs.length} ${t('common.track', { plural: label.songs.length !== 1 })}`,
          formatTime(label.duration || 0)
        ].join(' \u2022 ');

        return (
          <div key={label._id} className={classes.itemRoot}>
            <ButtonBase
              className={classes.itemLabel}
              onClick={() => set({
                name: label.label,
                collection: labelsById[label._id].songs
                  .map(id => songsById[id])
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
                {label.label || ''}
              </Typography>
              {!isSmall && (
                <Typography clamp variant="caption">
                  {labelPrimary}
                </Typography>
              )}
            </ButtonBase>
            <div className={classes.itemAlbums}>
              {label.albums.map(album => (
                <ButtonBase
                  key={album._id}
                  className={classes.itemButton}
                  onClick={() => set({
                    name: album.album,
                    collection: album.songs
                      .map(id => songsById[id])
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
                    loading="lazy"
                  />
                </ButtonBase>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

LibraryAlbums.propTypes = {
  songsById: PropTypes.shape({}).isRequired,
  labelsById: PropTypes.shape({}).isRequired,
  labels: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    duration: PropTypes.number,
    label: PropTypes.string,
    songs: PropTypes.arrayOf(PropTypes.string).isRequired,
    albums: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      cover: PropTypes.string,
      songs: PropTypes.arrayOf(PropTypes.string).isRequired
    })).isRequired
  })).isRequired
};

const mapStateToProps = state => ({
  songsById: state.entities.songs.map,
  labelsById: state.entities.labels.map,
  labels: state.entities.labels.list
    .map(({ albums, ...restLabel }) => ({
      albums: albums
        .map(albumId => {
          const { cover, ...restAlbum } = state.entities.albums.map[albumId];

          return ({
            cover: cover.map(coverId => {
              const image = state.entities.images.map[coverId];

              return image ? image.file : null;
            })[0],
            ...restAlbum
          });
        })
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
    areStatesEqual: (next, prev) => (
      next.entities.songs.list.length === prev.entities.songs.list.length &&
      next.entities.labels.list.length === prev.entities.labels.list.length
    )
  }
)(LibraryAlbums);
