import React from 'react';
import { connect } from 'react-redux';
import { formatTime } from '@doombox-utils';
import PropTypes from 'prop-types';

// Core
import { ButtonBase, Typography, TablePair } from '../../components';

// Hooks
import { useTranslation, useAudio, useMediaQuery } from '../../hooks';

// Validation
import { propVirtualStyle, propAlbum, propLabel } from '../../validation/propTypes';

// Styles
import useLibraryItemStyles from './LibraryItem.styles';

const LibraryItem = props => {
  const {
    style,
    songMap,
    label,
    albums,
    primary,
    secondary
  } = props;
  const { t, getLocalizedTag } = useTranslation();
  const { set } = useAudio();
  const classes = useLibraryItemStyles();
  const isLg = useMediaQuery(({
    join,
    create,
    queries,
    values
  }) => join(
    create(queries.minWidth, values.lg),
    create(queries.minHeight, values.md)
  ));

  return (
    <div className={classes.root} style={style}>
      <ButtonBase
        className={classes.header}
        onClick={() => ({
          name: primary,
          collection: set(label.songs
            .map(id => songMap[id])
            .sort((a, b) => {
              if (a.metadata.date && b.metadata.date) {
                if (a.metadata.date < b.metadata.date) return -1;
                if (a.metadata.date > b.metadata.date) return 1;
              }
              if (a.metadata.year < b.metadata.year) return -1;
              if (a.metadata.disc.no < b.metadata.disc.no) return -1;
              if (a.metadata.disc.no > b.metadata.disc.no) return 1;
              if (a.metadata.track.no < b.metadata.track.no) return -1;
              if (a.metadata.track.no > b.metadata.track.no) return 1;
              return 0;
            }))
        })}
      >
        <Typography clamp>
          {primary}
        </Typography>
        <Typography clamp variant="subtitle" color="textSecondary">
          {secondary}
        </Typography>
      </ButtonBase>
      <div className={classes.albums}>
        {albums.map(album => (
          <ButtonBase
            key={album._id}
            className={classes.button}
            onClick={() => set({
              name: getLocalizedTag(album, 'album'),
              collection: album.songs
                .map(id => songMap[id])
                .sort((a, b) => {
                  if (a.metadata.disc.no < b.metadata.disc.no) return -1;
                  if (a.metadata.disc.no > b.metadata.disc.no) return 1;
                  if (a.metadata.track.no < b.metadata.track.no) return -1;
                  if (a.metadata.track.no > b.metadata.track.no) return 1;
                  return 0;
                })
            })}
          >
            <img
              src={album.cover}
              alt={getLocalizedTag(album, 'album')}
              className={classes.cover}
              decoding="async"
            />
            {isLg && (
              <div className={classes.metadata}>
                <Typography fontWeight={500} clamp={2}>
                  {getLocalizedTag(album, 'album')}
                </Typography>
                <Typography color="textSecondary" clamp>
                  {getLocalizedTag(album, 'artist')}
                </Typography>
                <TablePair
                  className={classes.table}
                  variant="subtitle"
                  values={[{
                    label: t('common.release', { transform: 'capitalize' }),
                    value: album.date || album.year
                  }, {
                    label: t('common.duration', { transform: 'capitalize' }),
                    value: formatTime(album.duration)
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
          </ButtonBase>
        ))}
      </div>
    </div>
  );
};

LibraryItem.propTypes = {
  songMap: PropTypes.shape({}).isRequired,
  style: propVirtualStyle.isRequired,
  label: propLabel.isRequired,
  albums: PropTypes.arrayOf(propAlbum).isRequired,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  songMap: state.entities.songs.map
});

export default connect(
  mapStateToProps
)(LibraryItem);
