import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { clamp } from '../../../utils/math';
import { MIXINS } from '../../utils';

import './Slider.scss';

const Slider = props => {
  const {
    min,
    max,
    value,
    orientation,
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    ...rest
  } = props;
  const [sliding, setSliding] = useState({ enabled: false, value: 0 });

  const ref = useRef(null);

  const innerValue = sliding.enabled ? sliding.value : value;
  const percentage = innerValue / ((max - min) / 100);

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

  const handleMouseMove = event => {
    setSliding({ enabled: true, value: getValue(event) });
    if (onDrag) onDrag(event, getValue(event));
  };

  const handleMouseUp = event => {
    setSliding({ enabled: false, value: getValue(event) });
    if (onDragEnd) onDragEnd(event, getValue(event));

    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  const handleOnMouseDown = event => {
    event.preventDefault();
    setSliding({ enabled: true, value: getValue(event) });
    if (onDragStart) onDragStart(event, getValue(event));

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className="Slider"
      style={orientation === 'horizontal' ? ({
        width: '100%',
        height: MIXINS.slider.track
      }) : ({
        width: MIXINS.slider.track,
        height: '100%',
        flexDirection: 'column-reverse'
      })}
      ref={ref}
      {...rest}
    >
      <div
        className="trackActive"
        style={orientation === 'horizontal' ? ({
          width: `${percentage}%`,
          height: '100%',
          justifyContent: 'flex-end'
        }) : ({
          width: '100%',
          height: `${percentage}%`,
          justifyContent: 'flex-start',
          flexDirection: 'column'
        })}
        onMouseDown={event => onClick && onClick(event, getValue(event))}
        // Aria
        role="button"
        aria-label="SliderTrack"
        tabIndex={0}
      >
        <div
          className="thumb"
          style={orientation === 'horizontal' ? ({
            left: `${MIXINS.slider.thumb * (1 - (percentage / 100))}px`
          }) : ({
            bottom: `${MIXINS.slider.thumb * (1 - (percentage / 100))}px`
          })}
          onMouseDown={handleOnMouseDown}
          // Aria
          role="slider"
          aria-valuenow={innerValue}
          aria-valuemin={min}
          aria-valuemax={max}
          tabIndex={0}
          aria-label="SliderThumb"
        />
      </div>
      <div
        className="trackInactive"
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
  onDragStart: null,
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
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number
};

export default Slider;
