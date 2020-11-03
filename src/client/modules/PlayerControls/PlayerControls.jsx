import React from 'react';
import { cx } from 'emotion';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import {
  Icon,
  IconButton,
  IconButtonPlay,
  IconButtonVolume
} from '../../components';

// Hooks
import { useAudio, useMediaQuery } from '../../hooks';

// Styles
import usePlayerControls from './PlayerControls.styles';

const PlayerControls = ({ className }) => {
  const { next, previous, shuffle } = useAudio();
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const classes = usePlayerControls();

  return (
    <div className={cx(classes.root, className)}>
      <IconButtonVolume small={isSmall} />
      <IconButton small={isSmall} onClick={previous}>
        <Icon type="previous" />
      </IconButton>
      <IconButtonPlay small={isSmall} />
      <IconButton small={isSmall} onClick={next}>
        <Icon type="next" />
      </IconButton>
      <IconButton small={isSmall} onClick={shuffle}>
        <Icon type="shuffle" />
      </IconButton>
    </div>
  );
};

const mapStateToProps = state => ({
  volume: state.player.volume,
  status: state.player.status
});

PlayerControls.defaultProps = {
  className: null
};

PlayerControls.propTypes = {
  className: PropTypes.string
};

export default connect(
  mapStateToProps
)(PlayerControls);
