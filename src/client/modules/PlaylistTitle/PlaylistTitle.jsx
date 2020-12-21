import React from 'react';
import { connect } from 'react-redux';
import { formatTime } from '@doombox-utils';
import PropTypes from 'prop-types';

// Core
import { Typography } from '../../components';

// Hooks
import { useMediaQuery, useTranslation } from '../../hooks';

// Styles
import usePlaylistTitleStyles from './PlaylistTitle.styles';

const PlaylistTitle = ({ name, duration, size }) => {
  const { t } = useTranslation();
  const classes = usePlaylistTitleStyles();
  const displaySecondary = useMediaQuery(({ join, create }) => join(
    create('minWidth', 'sm'),
    create('minHeight', 'xs')
  ));

  return (
    <div className={classes.root}>
      <Typography clamp fontWeight={displaySecondary ? 500 : 400}>
        {`${name || t('common.playlist', { transform: 'capitalize' })}${!displaySecondary ? ` (${size})` : ''}`}
      </Typography>
      {displaySecondary && (
        <Typography>
          {[
            `${size} ${t('common.track', { plural: size !== 1 })}`,
            formatTime(duration, { useText: true })
          ].join(' \u2022 ')}
        </Typography>
      )}
    </div>
  );
};

PlaylistTitle.defaultProps = {
  name: null,
  duration: 0,
  size: 0
};

PlaylistTitle.propTypes = {
  name: PropTypes.string,
  duration: PropTypes.number,
  size: PropTypes.number
};

const mapStateToProps = state => ({
  name: state.playlist.name,
  duration: state.playlist.duration,
  size: state.playlist.collection.length,
});

export default connect(
  mapStateToProps
)(PlaylistTitle);
