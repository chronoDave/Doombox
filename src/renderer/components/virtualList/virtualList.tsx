import type { Rect } from '../../../types/primitives';

import * as forgo from 'forgo';

import createVirtualList from '../../utils/createVirtualList';
import debounce from '../../utils/debounce';

import './virtualList.scss';

export type VirtualListProps<T> = {
  list: T[]
  item: {
    id?: (data: T) => string
    height: (data: T, container: Rect) => number
    render: (item: { data: T, container: Rect, i: number }) => forgo.Component | forgo.Component[]
  }
};

const VirtualList = <T extends any>(
  initial: VirtualListProps<T>
): forgo.Component<VirtualListProps<T>> => {
  const { signal, abort } = new AbortController();
  const ref: forgo.ForgoRef<HTMLDivElement> = {};

  let prev = 0;
  const component = new forgo.Component<VirtualListProps<T>>({
    render(props) {
      const container = {
        width: ref.value?.clientWidth ?? 0,
        height: ref.value?.clientHeight ?? 0
      };
      const list = createVirtualList({
        data: props.list,
        overscroll: 1,
        scroll: ref.value?.scrollTop ?? 0,
        container,
        item: {
          height: props.item.height
        }
      });

      if (list.height !== prev) {
        prev = list.height;
        if (ref.value) ref.value.scrollTop = 0;
      }

      return (
        <div class='VirtualList' ref={ref}>
          <ul style={{ height: `${list.height}px` }}>
            {list.columns.map(column => (
              <li
                class='VirtualItem'
                key={props.item.id?.(column.data) ?? column.data}
                style={{
                  top: `${column.position.top}px`,
                  height: `${column.position.height}px`
                }}
              >
                {props.item.render({ data: column.data, i: column.index, container })}
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
      if (prevHeight !== window.innerHeight || prevWidth !== window.innerWidth) {
        prevHeight = window.innerHeight;
        prevWidth = window.innerWidth;
        update();
      }
    }, { passive: true, signal });

    ref.value?.addEventListener('scroll', update, { passive: true, signal });

    update();
  });

  component.unmount(() => {
    abort();
  });

  return component;
};

export default VirtualList;
