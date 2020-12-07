import React from 'react';
import { cx } from 'emotion';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { ButtonIcon, ButtonPlay, ButtonVolume } from '../../components';

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
      <ButtonVolume small={!isNotSmall} />
      <ButtonIcon icon="previous" small={!isNotSmall} onClick={previous} />
      <ButtonPlay small={!isNotSmall} />
      <ButtonIcon icon="next" small={!isNotSmall} onClick={next} />
      <ButtonIcon icon="shuffle" small={!isNotSmall} onClick={shuffle} />
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
