import React from 'react';
import { connect } from 'react-redux';
import { formatTime } from '@doombox-utils';
import PropTypes from 'prop-types';

// Core
import { Typography } from '../../components';

// Styles
import usePlayerTimeStyles from './PlayerTime.styles';

const PlayerTime = ({ position, duration }) => {
  const classes = usePlayerTimeStyles();

  return (
    <div className={classes.root}>
      <Typography>
        {formatTime(position)}
      </Typography>
      <Typography>
        {`-${formatTime(duration - position)}`}
      </Typography>
    </div>
  );
};

const mapStateToProps = state => ({
  position: state.player.position,
  duration: state.player.duration
});

PlayerTime.propTypes = {
  position: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired
};

export default connect(
  mapStateToProps
)(PlayerTime);
