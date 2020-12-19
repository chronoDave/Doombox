import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Slider } from '../../components';

// Hooks
import { useAudio } from '../../hooks';

// Styles
import usePlayerSliderStyles from './PlayerSlider.styles';

const PlayerSlider = ({ position, duration }) => {
  const { seek } = useAudio();
  const classes = usePlayerSliderStyles();

  return (
    <div className={classes.root}>
      <Slider
        value={position}
        max={duration}
        onDrag={seek}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  position: state.player.position,
  duration: state.player.duration
});

PlayerSlider.propTypes = {
  position: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired
};

export default connect(
  mapStateToProps
)(PlayerSlider);
