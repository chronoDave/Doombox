import * as forgo from 'forgo';

import { sumSelect } from '@doombox/lib/math/sum';
import debounce from '@doombox/renderer/fn/debounce';

import { createVirtualList } from './virtualList.utils';

import './virtualList.scss';

export type VirtualListProps<T> = {
  data: T[]
  onclick?: (
    id: string,
    event: (
      forgo.JSX.TargetedKeyboardEvent<HTMLDivElement> |
      forgo.JSX.TargetedMouseEvent<HTMLDivElement>
    )
  ) => void
  scrollTo?: number
  cell: {
    id: (data: T) => string
    height: (data: T) => number
    render: (props: {
      data: T,
      scrollTo: (n: number) => void
      index: number
    }) => forgo.Component | forgo.Component[]
  }
};

const VirtualList = <T extends any>(
  initial: VirtualListProps<T>
): forgo.Component<VirtualListProps<T>> => {
  const abortController = new AbortController();
  const ref: forgo.ForgoRef<HTMLDivElement> = {};

  let prev = 0;
  let scrolled = 0;
  const component = new forgo.Component<VirtualListProps<T>>({
    render(props) {
      const handleClick = (
        target: HTMLElement | null,
        event: (
          forgo.JSX.TargetedKeyboardEvent<HTMLDivElement> |
          forgo.JSX.TargetedMouseEvent<HTMLDivElement>
        )
      ) => {
        const item = target?.classList.contains('VirtualItem') ?
          target :
          target?.closest<HTMLElement>('.VirtualItem');

        if (item) props.onclick?.(item.dataset.id!, event);
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
          height: props.cell.height,
          id: props.cell.id
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
          onclick={event => handleClick(event.target as HTMLElement | null, event)}
          onkeydown={event => {
            if (event.key === 'Enter' && event.target) handleClick(event.target as HTMLElement, event);
          }}
        >
          <ol style={{ height: `${list.height}px` }}>
            {list.cells.map((cell, i) => (
              <li
                class='VirtualItem'
                key={cell.id}
                style={{
                  top: `${cell.y}px`,
                  height: `${cell.height}px`
                }}
                data-id={cell.id}
              >
                {props.cell.render({
                  data: cell.data,
                  index: i,
                  scrollTo: n => {
                    if (scrolled !== n) {
                      scrolled = n;
                      const top = (n === list.columns.length - 1 ?
                        list.height :
                        sumSelect(list.columns.slice(0, n), x => x.height));

                      ref.value?.scrollTo({ top });
                    }
                  }
                })}
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
