import * as forgo from 'forgo';

import debounce from '../../utils/debounce';

import { createVirtualList } from './virtualList.utils';

import './virtualList.scss';

export type VirtualListProps<T> = {
  data: T[]
  onclick?: (action: string, id: string) => void
  cell: {
    id?: (data: T) => string
    height: (data: T) => number
    render: (data: T, i: number) => forgo.Component | forgo.Component[]
  }
};

const VirtualList = <T extends any>(
  initial: VirtualListProps<T>
): forgo.Component<VirtualListProps<T>> => {
  const abortController = new AbortController();
  const ref: forgo.ForgoRef<HTMLDivElement> = {};

  let prev = 0;
  const component = new forgo.Component<VirtualListProps<T>>({
    render(props) {
      const handleClick = (target: HTMLElement | null) => {
        const closest = target?.closest<HTMLElement>('[data-action]');

        if (
          (closest?.classList.contains('VirtualItem') || closest?.closest('.VirtualItem')) &&
          closest.dataset.action &&
          closest.dataset.id
        ) {
          props.onclick?.(closest.dataset.action, closest.dataset.id);
        }
      };

      const container = {
        width: ref.value?.clientWidth ?? 0,
        height: ref.value?.clientHeight ?? 0
      };
      const list = createVirtualList({
        data: props.data,
        scroll: ref.value?.scrollTop ?? 0,
        container,
        cell: {
          height: props.cell.height
        }
      });

      if (list.height !== prev) {
        prev = list.height;
        if (ref.value) ref.value.scrollTop = 0;
      }

      return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          class='VirtualList'
          ref={ref}
          onclick={event => handleClick(event.target as HTMLElement | null)}
          onkeydown={event => {
            if (event.key === 'Enter' && event.target) handleClick(event.target as HTMLElement);
          }}
        >
          <ol style={{ height: `${list.height}px` }}>
            {list.cells.map((cell, i) => (
              <li
                class='VirtualItem'
                key={props.cell.id?.(cell.data) ?? cell.data}
                style={{
                  top: `${cell.y}px`,
                  height: `${cell.height}px`
                }}
              >
                {props.cell.render(cell.data, i)}
              </li>
            ))}
          </ol>
        </div>
      );
    }
  });

  component.mount(() => {
    const update = debounce(() => component.update());
    let prevHeight: number = window.innerHeight;
    let prevWidth: number = window.innerWidth;

    window.addEventListener('resize', () => {
      if (prevHeight !== window.innerHeight || prevWidth !== window.innerWidth) {
        prevHeight = window.innerHeight;
        prevWidth = window.innerWidth;
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

export default VirtualList;
