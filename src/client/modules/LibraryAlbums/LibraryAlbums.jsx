import React from 'react';
import { formatTime } from '@doombox-utils';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { ButtonBase, Box, useMediaQuery } from '@material-ui/core';

import { Tooltip, Typography } from '../../components';

// Hooks
import { useTranslation, useAudio } from '../../hooks';

// Utils
import { sortByTrack } from '../../utils';

const LibraryAlbums = ({ songs, labels }) => {
  const { t } = useTranslation();
  const { set } = useAudio();

  const isSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));

  return (
    <Box
      display="flex"
      flexDirection="column"
      overflow="auto"
      flexGrow={1}
    >
      {labels.map(label => {
        const labelPrimary = [
          `${label.albums.length} ${t('common.album', { plural: label.albums.length !== 1 })}`,
          `${label.songs.length} ${t('common.track', { plural: label.songs.length !== 1 })}`,
          formatTime(label.duration || 0)
        ].join(' \u2022 ');

        return (
          <Box key={label._id} display="flex" flexDirection="column">
            <Box display="flex" flexDirection="column">
              <Tooltip disabled={!isSmall} primary={labelPrimary}>
                <Typography noWrap variant="body2">
                  {label.label || ''}
                </Typography>
              </Tooltip>
              {!isSmall && (
                <Typography noWrap variant="caption" color="textSecondary">
                  {labelPrimary}
                </Typography>
              )}
            </Box>
            <Box display="flex" flexWrap="wrap">
              {label.albums.map(album => (
                <ButtonBase
                  key={album._id}
                  onClick={() => set({
                    name: album.album,
                    collection: album.songs
                      .map(id => songs[id])
                      .sort(sortByTrack)
                  })}
                >
                  <img
                    src={album.cover}
                    alt={album.album}
                    width="100%"
                    height="100%"
                    decoding="async"
                    loading="lazy"
                  />
                </ButtonBase>
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

LibraryAlbums.propTypes = {
  songs: PropTypes.shape({}).isRequired,
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
  songs: state.entities.songs.map,
  labels: state.entities.labels.list
    .map(({ albums, ...restLabel }) => ({
      albums: albums.map(albumId => {
        const { cover, ...restAlbum } = state.entities.albums.map[albumId];

        return ({
          cover: cover.map(coverId => {
            const image = state.entities.images.map[coverId];

            return image ? image.file : null;
          })[0],
          ...restAlbum
        });
      }),
      ...restLabel
    }))
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
