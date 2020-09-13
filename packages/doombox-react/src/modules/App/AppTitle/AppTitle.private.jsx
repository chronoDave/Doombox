import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Core
import { Hidden } from '@material-ui/core';

import { Typography } from '../../../components';

// Styles
import { useAppStyles } from '../App.styles';

const AppTitle = ({ title, artist, album }) => {
  const classes = useAppStyles();

  const getTitle = () => {
    if (title || artist || album) return `${artist || 'Unknown'} - ${title || 'Unknown'} (${album || 'Unknown'})`;
    return 'Doombox';
  };

  return (
    <div className={clsx(classes.barTitle, classes.drag)}>
      <Hidden xsDown>
        <Typography noWrap variant="body2">
          {getTitle()}
        </Typography>
      </Hidden>
    </div>
  );
};

AppTitle.propTypes = {
  title: PropTypes.string,
  artist: PropTypes.string,
  album: PropTypes.string
};

AppTitle.defaultProps = {
  title: '',
  artist: '',
  album: ''
};

const mapStateToProps = state => ({
  title: state.audio.metadata.title,
  artist: state.audio.metadata.artist,
  album: state.audio.metadata.album
});

export default connect(
  mapStateToProps
)(AppTitle);
