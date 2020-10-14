import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Slider } from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks';

// Styles
import { usePlayerStyles } from './Player.style';

const PlayerProgress = ({ duration, position }) => {
  const { seek } = useAudio();
  const classes = usePlayerStyles();

  return (
    <Slider
      value={position}
      max={duration}
      onChange={(_, value) => seek(value)}
      classes={{
        root: classes.progressRoot,
        rail: classes.progressRail,
        track: classes.progressTrack,
        thumb: classes.progressThumb
      }}
    />
  );
};

PlayerProgress.propTypes = {
  position: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  position: state.player.position,
  duration: state.player.duration
});

export default connect(
  mapStateToProps
)(PlayerProgress);
