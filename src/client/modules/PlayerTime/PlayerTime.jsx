import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Typography } from '../../components';

// Hooks
import { useTranslation } from '../../hooks';

// Styles
import usePlayerTimeStyles from './PlayerTime.styles';

const PlayerTime = ({ position, duration }) => {
  const classes = usePlayerTimeStyles();
  const { formatTime } = useTranslation();

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
