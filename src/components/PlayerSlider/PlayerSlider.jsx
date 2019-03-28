import React from 'react';
import PropTypes from 'prop-types';

// Experimental
import Slider from '@material-ui/lab/Slider';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import { GridContainer } from '../Grid';

// Style
import PlayerSliderStyle from './PlayerSliderStyle';

const PlayerSlider = props => {
  const {
    position,
    onDrag,
    elapsed,
    remaining,
    classes
  } = props;

  return (
    <div className={classes.root}>
      <Slider
        value={position}
        onChange={onDrag}
        classes={{
          track: classes.track,
          trackBefore: classes.trackBefore,
          thumb: classes.thumb
        }}
      />
      <GridContainer
        justify="space-between"
        classes={{ root: classes.textContainer }}
      >
        <Typography
          variant="caption"
          color="textSecondary"
        >
          {elapsed}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
        >
          {`-${remaining}`}
        </Typography>
      </GridContainer>
    </div>
  );
};

PlayerSlider.propTypes = {
  position: PropTypes.number.isRequired,
  onDrag: PropTypes.func,
  elapsed: PropTypes.string,
  remaining: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(PlayerSliderStyle)(PlayerSlider);
