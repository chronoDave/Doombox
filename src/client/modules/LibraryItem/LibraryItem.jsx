import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { ButtonBase, Typography, TablePair } from '../../components';

// Hooks
import { useTranslation, useAudio, useMediaQuery } from '../../hooks';

// Redux
import { populateLabel } from '../../redux';

// Validation
import { propLabel, propVirtualStyle } from '../../validation/propTypes';

// Styles
import useLibraryItemStyles from './LibraryItem.styles';

const LibraryItem = props => {
  const {
    style,
    primary,
    secondary,
    onMouseLeave,
    label,
    onContextMenu
  } = props;
  const classes = useLibraryItemStyles();

  const { set } = useAudio();
  const {
    t,
    getLocalizedTag,
    formatDate,
    formatTime
  } = useTranslation();
  const isLg = useMediaQuery(({ join, create }) => join(
    create('minWidth', 'lg'),
    create('minHeight', 'md')
  ));

  return (
    <div className={classes.root} style={style}>
      <div className={classes.header}>
        <ButtonBase
          className={classes.headerButton}
          onClick={() => set({ name: primary, collection: label.songs })}
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
        {label.albums.map(album => (
          <div className={classes.album} key={album._id}>
            <ButtonBase
              className={classes.albumButton}
              onClick={() => set({
                name: getLocalizedTag(album, 'album'),
                collection: album.songs
              })}
              onContextMenu={event => onContextMenu(event, album)}
              onMouseLeave={onMouseLeave}
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
                    value: formatDate(album.date || album.year)
                  }, {
                    label: t('common.duration', { transform: 'capitalize' }),
                    value: formatTime(album.duration, 'text')
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
  label: propLabel.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
  label: populateLabel(state, props)
});

export default connect(
  mapStateToProps
)(LibraryItem);
