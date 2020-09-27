import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Core
import { Hidden } from '@material-ui/core';

import { Typography } from '../../components';

// Styles
import { useAppBarStyles } from './AppBar.styles';

const AppBarTitle = ({ title, artist, album }) => {
  const classes = useAppBarStyles();

  const getTitle = () => {
    if (title || artist || album) return `${artist || 'Unknown'} - ${title || 'Unknown'} (${album || 'Unknown'})`;
    return 'Doombox';
  };

  return (
    <div className={clsx(classes.titleRoot, classes.drag)}>
      <Hidden xsDown>
        <Typography noWrap variant="body2">
          {getTitle()}
        </Typography>
      </Hidden>
    </div>
  );
};

AppBarTitle.propTypes = {
  title: PropTypes.string,
  artist: PropTypes.string,
  album: PropTypes.string
};

AppBarTitle.defaultProps = {
  title: '',
  artist: '',
  album: ''
};

const mapStateToProps = state => ({
  title: state.player.metadata.title,
  artist: state.player.metadata.artist,
  album: state.player.metadata.album
});

export default connect(
  mapStateToProps
)(AppBarTitle);
