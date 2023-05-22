import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import clamp from '../../../utils/number/clamp';
import debounce from '../../utils/debounce';

import './slider.scss';

export type SliderEvent = {
  target: HTMLElement,
  value: number
};

export type SliderProps = {
  size?: {
    track?: number
    thumb?: number
  }
  value: number
  ariaValue?: (value: number) => string
  min?: number
  max?: number
  step?: number
  onchange: (value: number) => void
};

const Slider: Component<SliderProps> = () => {
  let dragging = false;

  const normalizeProps = (props: SliderProps) => ({
    ...props,
    min: props.min ?? 0,
    max: props.max ?? 100,
    step: props.step ?? 1,
    size: {
      thumb: props.size?.thumb ?? 16,
      track: props.size?.track ?? 8
    }
  });

  const handleSeek = debounce((props: SliderProps, event: SliderEvent) => {
    const { min, max, size } = normalizeProps(props);
    const { left, width } = event.target.getBoundingClientRect();
    const rel = Math.max(0, (left - event.value) * -1);
    const offset = rel / width; // <0,1>
    const offsetThumb = ((size.thumb / 2) / width) * -offset;

    props.onchange(clamp(min, max, (max * (offset - offsetThumb))));
  });

  const component = new forgo.Component<SliderProps>({
    render(props) {
      const {
        min,
        max,
        step,
        size
      } = normalizeProps(props);
      const handlePointerMove = (event: SliderEvent) => dragging && handleSeek(props, event);

      const offset = props.value === 0 || max === 0 ?
        0 :
        props.value / max;

      return (
        <div
          class='Slider'
          style={{ height: `${size.thumb}px` }}
          role='slider'
          tabindex={0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={props.value}
          aria-valuetext={props.ariaValue?.(props.value) ?? props.value}
          onpointerdown={() => { dragging = true; }}
          onpointerup={() => { dragging = false; }}
          onpointerout={() => { dragging = false; }}
          ondragstart={event => event.preventDefault()}
          onkeydown={event => {
            if (event.key === 'Home') props.onchange(min);
            if (event.key === 'End') props.onchange(max);
            if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
              props.onchange(Math.max(min, props.value - step));
            }
            if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
              props.onchange(Math.min(max, props.value + step));
            }
          }}
          onpointermove={event => handlePointerMove({
            target: event.currentTarget,
            value: event.clientX
          })}
          onclick={event => handleSeek(props, {
            target: event.currentTarget,
            value: event.clientX
          })}
        >
          <div
            class='track'
            style={{ height: `${size.track}px` }}
          >
            <div
              class='trail'
              style={{
                width: `calc(${offset * 100}% - ${(size.track / 2) * (offset - 0.5)}px)`
              }}
            />
          </div>
          <div
            class='thumb'
            style={{
              left: `${offset * 100}%`,
              transform: `translateX(-${offset * 100}%)`
            }}
          />
        </div>
      );
    }
  });

  return component;
};

export default Slider;
