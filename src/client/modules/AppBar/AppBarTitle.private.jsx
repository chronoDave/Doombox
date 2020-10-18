import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Core
import { Typography, Hidden } from '../../components';

// Actions
import { setWindowTitle } from '../../actions';

// Styles
import { useAppBarStyles } from './AppBar.styles';

const AppBarTitle = ({ title, artist, album }) => {
  const [appTitle, setAppTitle] = useState('Doombox');
  const classes = useAppBarStyles();

  useEffect(() => {
    if (title || artist || album) {
      const newAppTitle = `${artist || 'Unknown'} - ${title || 'Unknown'} (${album || 'Unknown'}) - Doombox`;

      setAppTitle(newAppTitle);
      setWindowTitle(newAppTitle);
    }
  }, [title, artist, album]);

  return (
    <div className={clsx(classes.titleRoot, classes.drag)}>
      <Hidden className={classes.titleHidden} smallDown>
        <Typography noWrap variant="body2">
          {appTitle}
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
