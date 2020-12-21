import React, { useRef } from 'react';
import { clamp } from '@doombox-utils';
import PropTypes from 'prop-types';

// Styles
import useSliderStyles from './Slider.styles';

const Slider = props => {
  const {
    min,
    max,
    value,
    orientation,
    onClick,
    onDrag,
    onDragEnd,
    ...rest
  } = props;
  const ref = useRef(null);
  const classes = useSliderStyles({
    value: value / ((max - min) / 100),
    orientation
  });

  const getValue = event => {
    const container = ref.current.getBoundingClientRect();

    const valueOffset = orientation === 'vertical' ?
      container.y :
      container.x;
    const valueMax = (orientation === 'vertical' ?
      container.height :
      container.width
    );
    const valueCurrent = (orientation === 'vertical' ?
      event.clientY :
      event.clientX
    );

    const newValue = (clamp(0, valueMax, valueCurrent - valueOffset) / valueMax) * (max - min);

    return orientation === 'vertical' ?
      1 - newValue :
      newValue;
  };

  const handleMouseMove = event => onDrag && onDrag(event, getValue(event));

  const handleMouseUp = event => {
    if (onDragEnd) onDragEnd(event, getValue(event));

    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  const handleOnMouseDown = event => {
    event.preventDefault();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className={classes.root} ref={ref} {...rest}>
      <div
        className={classes.trackActive}
        onMouseDown={event => onClick && onClick(event, getValue(event))}
        // Aria
        role="button"
        aria-label="SliderTrack"
        tabIndex={0}
      >
        <div
          className={classes.thumb}
          onMouseDown={handleOnMouseDown}
          // Aria
          role="slider"
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          tabIndex={0}
          aria-label="SliderThumb"
        />
      </div>
      <div
        className={classes.trackInactive}
        onMouseDown={event => onClick && onClick(event, getValue(event))}
        // Aria
        role="button"
        aria-label="SliderTrack"
        tabIndex={0}
      />
    </div>
  );
};

Slider.defaultProps = {
  orientation: 'horizontal',
  min: 0,
  max: 100,
  onDrag: null,
  onDragEnd: null,
  onClick: null
};

Slider.propTypes = {
  value: PropTypes.number.isRequired,
  orientation: PropTypes.oneOf([
    'vertical',
    'horizontal'
  ]),
  onClick: PropTypes.func,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number
};

export default Slider;
