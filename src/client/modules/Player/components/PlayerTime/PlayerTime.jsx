import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Typography } from '../../../../components';

// Hooks
import { useTranslation } from '../../../../hooks';

// Styles
import usePlayerTimeStyles from './PlayerTime.styles';

const PlayerTime = ({ duration, current }) => {
  const { formatTime } = useTranslation();
  const classes = usePlayerTimeStyles();

  return (
    <div className={classes.root}>
      <Typography color="inherit">
        {formatTime(current)}
      </Typography>
      <Typography color="inherit">
        {`-${formatTime(duration - current)}`}
      </Typography>
    </div>
  );
};

PlayerTime.propTypes = {
  duration: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  duration: state.player.metadata.duration
});

export default connect(
  mapStateToProps
)(PlayerTime);
