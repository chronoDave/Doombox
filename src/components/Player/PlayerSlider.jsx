import React from 'react';
import PropTypes from 'prop-types';

// Experimental
import Slider from '@material-ui/lab/Slider';

// Core
import withStyles from '@material-ui/core/styles/withStyles';

import { GridContainer } from '../Grid';
import Typography from '../Typography/Typography';

// Style
import PlayerSliderStyle from './PlayerSliderStyle';

const PlayerSlider = props => {
  const { elapsed, remaining, position, onDrag, classes } = props;

  return (
    <GridContainer classes={{ root: classes.root }}>
      <Slider
        value={position}
        onChange={onDrag}
        classes={{
          track: classes.track,
          thumb: classes.thumb
        }}
      />
      <GridContainer
        justify="space-between"
        classes={{ root: classes.numbers }}
      >
        <Typography variant="caption">{elapsed}</Typography>
        <Typography variant="caption">{`-${remaining}`}</Typography>
      </GridContainer>
    </GridContainer>
  );
};

PlayerSlider.propTypes = {
  classes: PropTypes.object.isRequired,
  elapsed: PropTypes.string,
  remaining: PropTypes.string,
  position: PropTypes.number,
  onDrag: PropTypes.func
};

export default withStyles(PlayerSliderStyle)(PlayerSlider);
