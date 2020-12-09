import React, { useRef } from 'react';
import { cx } from 'emotion';
import { clamp } from '@doombox-utils';
import PropTypes from 'prop-types';

// Styles
import useSliderStyles from './Slider.styles';

const Slider = props => {
  const {
    value,
    vertical,
    onDrag,
    onDragEnd,
    min,
    max,
    ...rest
  } = props;
  const ref = useRef(null);
  const classes = useSliderStyles({ value: value / ((max - min) / 100) });

  const getValueHorizontal = event => {
    const container = ref.current.getBoundingClientRect();
    const containerWidth = container.width - 4; // Adjusted for thumb width
    const current = clamp(
      container.x,
      containerWidth + container.x,
      event.x
    ) - container.x;

    return (current / containerWidth) * (max - min);
  };

  const getValueVertical = event => {
    const container = ref.current.getBoundingClientRect();

    const containerHeight = container.height - 4; // Adjusted for thumb width
    const current = clamp(
      container.y,
      containerHeight + container.y,
      event.y
    ) - container.y;

    return 1 - (current / containerHeight) * (max - min);
  };

  const handleDragMove = event => onDrag(event, vertical ?
    getValueVertical(event) :
    getValueHorizontal(event));

  const handleDragEnd = event => {
    if (onDragEnd) {
      onDragEnd(event, vertical ?
        getValueVertical(event) :
        getValueHorizontal(event));
    }

    window.removeEventListener('mousemove', handleDragMove);
    window.removeEventListener('mouseup', handleDragEnd);
  };

  const handleDrag = event => {
    event.preventDefault();

    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);
  };

  const handleKeyDown = event => {
    if (vertical) {
      if (event.keyCode === 38) onDrag(event, value + ((max - min) * 0.05));
      if (event.keyCode === 40) onDrag(event, value - ((max - min) * 0.05));
    } else {
      if (event.keyCode === 37) onDrag(event, value - ((max - min) * 0.05));
      if (event.keyCode === 39) onDrag(event, value + ((max - min) * 0.05));
    }
  };

  return (
    <div
      className={cx(classes.root, { [classes.rootVertical]: vertical })}
      ref={ref}
      {...rest}
    >
      <div className={cx(classes.track, { [classes.trackVertical]: vertical })} />
      <div
        role="slider"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        tabIndex={0}
        aria-label="SliderThumb"
        className={cx(classes.thumb, { [classes.thumbVertical]: vertical })}
        onMouseDown={handleDrag}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

Slider.defaultProps = {
  vertical: false,
  min: 0,
  max: 100,
  onDragEnd: null
};

Slider.propTypes = {
  value: PropTypes.number.isRequired,
  vertical: PropTypes.bool,
  onDrag: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number
};

export default Slider;
