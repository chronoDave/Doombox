import React from 'react';
import { connect } from 'react-redux';
import { formatTime, sortMetadata } from '@doombox-utils';
import PropTypes from 'prop-types';

// Core
import { ButtonBase, Typography, TablePair } from '../../components';

// Hooks
import { useTranslation, useAudio, useMediaQuery } from '../../hooks';

// Validation
import { propSong, propAlbum, propVirtualStyle } from '../../validation/propTypes';

// Styles
import useLibraryItemStyles from './LibraryItem.styles';

const LibraryItem = props => {
  const {
    style,
    primary,
    secondary,
    labelSongs,
    albums
  } = props;
  const classes = useLibraryItemStyles();

  const { set } = useAudio();
  const { t, getLocalizedTag } = useTranslation();
  const isLg = useMediaQuery(({ join, create }) => join(
    create('minWidth', 'lg'),
    create('minHeight', 'md')
  ));

  return (
    <div className={classes.root} style={style}>
      <div className={classes.header}>
        <ButtonBase
          className={classes.headerButton}
          onClick={() => set({ name: primary, collection: labelSongs })}
        >
          <Typography clamp>
            {primary}
          </Typography>
          <Typography clamp variant="subtitle" color="textSecondary">
            {secondary}
          </Typography>
        </ButtonBase>
        <div className={classes.headerDivider} />
      </div>
      <div className={classes.albumContainer}>
        {albums.map(album => (
          <div className={classes.album} key={album._id}>
            <ButtonBase
              className={classes.albumButton}
              onClick={() => set({
                name: getLocalizedTag(album, 'album'),
                collection: album.songs
              })}
            >
              <img
                src={album.images[0] ? album.images[0].files.thumbnail : null}
                alt={getLocalizedTag(album, 'album')}
                decoding="async"
                className={classes.cover}
              />
            </ButtonBase>
            {isLg && (
              <div className={classes.metadata}>
                <Typography fontWeight={500} clamp={2}>
                  {getLocalizedTag(album, 'album')}
                </Typography>
                <Typography color="textSecondary" clamp>
                  {getLocalizedTag(album, 'albumartist')}
                </Typography>
                <TablePair
                  className={classes.table}
                  variant="subtitle"
                  values={[{
                    label: t('common.release', { transform: 'capitalize' }),
                    value: album.date || album.year
                  }, {
                    label: t('common.duration', { transform: 'capitalize' }),
                    value: formatTime(album.duration, { useText: true })
                  }, {
                    label: t('common.track', {
                      transform: 'capitalize',
                      plural: album.songs.length !== 1
                    }),
                    value: album.songs.length
                  }]}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

LibraryItem.propTypes = {
  style: propVirtualStyle.isRequired,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  labelSongs: PropTypes.arrayOf(propSong).isRequired,
  albums: PropTypes.arrayOf(propAlbum).isRequired
};

const mapStateToProps = (state, props) => ({
  labelSongs: state.entities.labels.map[props.id] ?
    state.entities.labels.map[props.id].songs
      .map(id => state.entities.songs.map[id])
      .sort(sortMetadata(
        ['date', 'year', 'disc', 'track'],
        state.config.display.useLocalizedMetadata
      )) :
    [],
  albums: state.entities.labels.map[props.id] ?
    state.entities.labels.map[props.id].albums
      .map(id => {
        const album = state.entities.albums.map[id];

        if (!album) return ({ images: [], songs: [] });
        return ({
          ...album,
          images: album.images
            .map(imageId => state.entities.images.map[imageId]),
          songs: album.songs
            .map(songId => state.entities.songs.map[songId])
            .sort(sortMetadata(['disc', 'track'], state.config.display.useLocalizedMetadata))
        });
      }).sort(sortMetadata(
        ['date', 'year'],
        state.config.display.useLocalizedMetadata
      )) :
    []
});

export default connect(
  mapStateToProps
)(LibraryItem);
