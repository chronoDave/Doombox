import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

export type LoaderProps = {
  bars: number
};

const Loader: Component<LoaderProps> = () => {
  const ref: forgo.ForgoRef<HTMLDivElement> = {};
  const component = new forgo.Component<LoaderProps>({
    render(props) {
      return (
        <div
          class="Loader"
          aria-hidden="true"
          style={{ '--loader-bars': props.bars }}
          ref={ref}
        >
          {Array.from({ length: props.bars }).map((_, i) => (
            <div
              class="bar"
              style={{ 'animation-delay': `-${i * 60}ms` }}
            />
          ))}
        </div>
      );
    }
  });

  component.shouldUpdate((cur, prev) => cur.bars !== prev.bars);
  component.afterRender(() => {
    ref.value?.childNodes.forEach(child => (child as HTMLDivElement)
      .getAnimations()
      .forEach(animation => {
        animation.currentTime = 0;
        animation.play();
      }));
  });

  return component;
};

export default Loader;
