import * as forgo from 'forgo';

import createVirtualList from '../../utils/createVirtualList';
import debounce from '../../utils/debounce';

import './virtualList.scss';

export type VirtualListProps<T> = {
  list: T[]
  overflow: number
  item: {
    height: number
    render: (data: T, i: number) => forgo.Component | forgo.Component[]
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
      const list = createVirtualList({
        data: props.list,
        overflow: props.overflow,
        scroll: ref.value?.scrollTop ?? 0,
        height: {
          item: props.item.height,
          container: ref.value?.clientHeight ?? 0
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
                key={column.data}
                style={{
                  top: `${column.position.top}px`,
                  height: `${column.position.height}px`
                }}
              >
                {props.item.render(column.data, column.index)}
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

    window.addEventListener('resize', () => {
      if (prevHeight !== window.innerHeight) {
        prevHeight = window.innerHeight;
        update();
      }
    }, { passive: true, signal });

    ref.value?.addEventListener('scroll', update, { passive: true, signal });
  });

  component.unmount(() => {
    abort();
  });

  return component;
};

export default VirtualList;
