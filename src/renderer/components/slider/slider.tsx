import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import clamp from '../../../utils/number/clamp';
import secToTime from '../../../utils/time/secToTime';
import timeToHhMmSs from '../../../utils/time/timeToHhMmSs';

import './slider.scss';

export type SliderProps = {
  value: number
  min: number
  max: number
  step: number
  onchange: (value: number) => void
};

const Slider: Component<SliderProps> = () => {
  const size = { thumb: 12, track: 6 };
  let dragging = false;

  const handleSeek = (
    event: { target: HTMLElement, x: number },
    props: SliderProps
  ) => {
    const { left, width } = event.target.getBoundingClientRect();
    const rel = Math.max(0, (left - event.x) * -1);
    const offset = (rel / width); // <0,1>
    const offsetThumb = ((size.thumb / 2) / width) * -offset;

    props.onchange(clamp(props.min, props.max, (props.max * (offset - offsetThumb))));
  };

  const handlePointerMove = (
    event: { target: HTMLElement, x: number },
    props: SliderProps
  ) => requestAnimationFrame(() => dragging && handleSeek(event, props));

  const component = new forgo.Component<SliderProps>({
    render(props) {
      const offset = props.value === 0 || props.max === 0 ?
        0 :
        props.value / props.max;

      return (
        <div
          class='Slider'
          style={{
            '--size-track': `${size.track}px`,
            '--size-thumb': `${size.thumb}px`
          }}
          role='slider'
          tabindex={0}
          aria-valuemin={props.min}
          aria-valuemax={props.max}
          aria-valuenow={props.value}
          aria-valuetext={timeToHhMmSs(secToTime(props.value))}
          onpointerup={() => { dragging = false; }}
          onpointerout={() => { dragging = false; }}
          ondragstart={event => event.preventDefault()}
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
          onclick={event => handleSeek({
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
