import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import clamp from '../../../utils/number/clamp';
import { formatTimeNumber } from '../../../utils/string/formatTime';

import './slider.scss';

export type SliderProps = {
  value: number
  min: number
  max: number
  step: number
  size: {
    track: number
    thumb: number
  }
  onchange: (value: number) => void
};

const Slider: Component<SliderProps> = () => {
  let dragging = false;

  const handlePointerMove = (
    event: { target: HTMLElement, x: number },
    props: SliderProps
  ) => requestAnimationFrame(() => {
    if (!dragging) return;

    const { left, width } = event.target.getBoundingClientRect();
    const rel = Math.max(0, (left - event.x) * -1);
    const offset = (rel / width); // <0,1>
    const offsetThumb = ((props.size.thumb / 2) / width) * -offset;

    props.onchange(clamp(props.min, props.max, (props.max * (offset - offsetThumb))));
  });

  const component = new forgo.Component<SliderProps>({
    render(props) {
      const offset = props.value === 0 || props.max === 0 ?
        0 :
        props.value / props.max;

      return (
        <div
          class='Slider'
          style={{
            '--size-track': `${props.size.track}px`,
            '--size-thumb': `${props.size.thumb}px`
          }}
          role='slider'
          tabindex={0}
          aria-valuemin={props.min}
          aria-valuemax={props.max}
          aria-valuenow={props.value}
          aria-valuetext={formatTimeNumber(props.value, 2)}
          onpointerup={() => { dragging = false; }}
          onpointerleave={() => { dragging = false; }}
          onkeydown={event => {
            if (event.key === 'Home') props.onchange(props.min);
            if (event.key === 'End') props.onchange(props.max);
            if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
              props.onchange(Math.max(props.min, props.value - props.step));
            }
            if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
              props.onchange(Math.min(props.max, props.value + props.step));
            }
          }}
          onpointermove={event => handlePointerMove({
            target: event.currentTarget,
            x: event.clientX
          }, props)}
        >
          <div class='track' />
          <div
            class='thumb'
            style={{ '--x': `${offset * 100}%` }}
            onpointerdown={() => { dragging = true; }}
          />
        </div>
      );
    }
  });

  return component;
};

export default Slider;
