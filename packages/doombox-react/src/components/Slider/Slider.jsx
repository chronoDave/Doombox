import React from 'react';

// Core
import { Slider as MuiSlider } from '@material-ui/core';

// Style
import { useSliderStyle } from './Slider.style';

const Slider = ({ ...rest }) => {
  const classes = useSliderStyle();

  return (
    <MuiSlider
      classes={{
        root: classes.sliderRoot,
        thumb: classes.sliderThumb,
        rail: classes.sliderRail,
        track: classes.sliderTrack,
        valueLabel: classes.sliderValueLabel
      }}
      {...rest}
    />
  );
};

export default Slider;
