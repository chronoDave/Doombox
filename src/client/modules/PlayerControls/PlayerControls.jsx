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
  const isNotSmall = useMediaQuery(breakpoints => breakpoints.join(
    breakpoints.create(
      breakpoints.queries.minWidth,
      breakpoints.values.sm
    ),
    breakpoints.create(
      breakpoints.queries.minHeight,
      breakpoints.values.xs
    )
  ));
  const classes = usePlayerControls();

  return (
    <div className={cx(classes.root, className)}>
      <IconButtonVolume small={!isNotSmall} />
      <IconButton small={!isNotSmall} onClick={previous}>
        <Icon type="previous" />
      </IconButton>
      <IconButtonPlay small={!isNotSmall} />
      <IconButton small={!isNotSmall} onClick={next}>
        <Icon type="next" />
      </IconButton>
      <IconButton small={!isNotSmall} onClick={shuffle}>
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
