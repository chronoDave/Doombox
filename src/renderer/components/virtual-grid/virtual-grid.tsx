import * as forgo from 'forgo';

import debounce from '../../../lib/function/debounce';

import virtualize from './virtual-grid.lib';

import './virtual-grid.scss';

export type VirtualGridProps<T> = {
  data: T[]
  onclick?: (
    dataset: DOMStringMap,
    event: (
      forgo.JSX.TargetedKeyboardEvent<HTMLDivElement> |
      forgo.JSX.TargetedMouseEvent<HTMLDivElement>
    )
  ) => void
  cell: {
    id?: (data: T) => string
    width: (data: T) => number | null
    height: (data: T) => number | null
    render: (data: T, i: number) => forgo.Component | forgo.Component[]
  }
};

const VirtualGrid = <T extends any>(
  initial: VirtualGridProps<T>
): forgo.Component<VirtualGridProps<T>> => {
  const abortController = new AbortController();
  const ref: forgo.ForgoRef<HTMLDivElement> = {};
  const component = new forgo.Component<VirtualGridProps<T>>({
    render(props) {
      const handleClick = (
        target: HTMLElement | null,
        event: (
          forgo.JSX.TargetedKeyboardEvent<HTMLDivElement> |
          forgo.JSX.TargetedMouseEvent<HTMLDivElement>
        )
      ) => {
        const closest = target?.closest<HTMLElement>('[data-action]');

        if (
          closest?.classList.contains('VirtualItem') ||
          closest?.closest('.VirtualItem')
        ) props.onclick?.(closest.dataset, event);
      };

      const grid = virtualize({
        data: props.data,
        scroll: ref.value?.scrollTop ?? 0,
        container: {
          width: ref.value?.clientWidth ?? 0,
          height: ref.value?.clientHeight ?? 0
        },
        cell: {
          width: props.cell.width,
          height: props.cell.height
        }
      });

      return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          ref={ref}
          class="virtual-grid"
          onclick={event => handleClick(event.target as HTMLElement | null, event)}
          onkeydown={event => {
            if (event.key === 'Enter' && event.target) handleClick(event.target as HTMLElement, event);
          }}
        >
          <ul style={{ height: `${grid.height}px` }}>
            {grid.cells.map((cell, i) => (
              <li
                class='VirtualItem'
                key={props.cell.id?.(cell.data) ?? cell.data}
                style={{
                  top: `${cell.y}px`,
                  left: `${cell.x}px`,
                  width: `${cell.width}px`,
                  height: `${cell.height}px`
                }}
              >
                {props.cell.render(cell.data, i)}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  });

  component.mount(() => {
    const update = debounce(() => component.update());
    let prevHeight: number = window.innerHeight;
    let prevWidth: number = window.innerWidth;

    window.addEventListener('resize', () => {
      if (
        prevWidth !== window.innerWidth ||
        prevHeight !== window.innerHeight
      ) {
        prevWidth = window.innerWidth;
        prevHeight = window.innerHeight;
        update();
      }
    }, { passive: true, signal: abortController.signal });

    ref.value?.addEventListener('scroll', update, { passive: true, signal: abortController.signal });

    update();
  });

  component.unmount(() => {
    abortController.abort();
  });

  return component;
};

export default VirtualGrid;
