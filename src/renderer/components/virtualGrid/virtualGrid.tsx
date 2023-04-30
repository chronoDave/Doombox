import * as forgo from 'forgo';

import createVirtualGrid from '../../utils/createVirtualGrid';
import debounce from '../../utils/debounce';

import './virtualGrid.scss';

export type VirtualGridProps<T> = {
  list: T[]
  overflow: number
  rows: number
  item: {
    height: number
    render: (data: T, index: number) => forgo.Component | forgo.Component[]
  }
};

const VirtualGrid = <T extends any>(
  initial: VirtualGridProps<T>
): forgo.Component<VirtualGridProps<T>> => {
  const { signal, abort } = new AbortController();
  const ref: forgo.ForgoRef<HTMLDivElement> = {};

  let prev = 0;
  const component = new forgo.Component<VirtualGridProps<T>>({
    render(props) {
      const grid = createVirtualGrid({
        data: props.list,
        overflow: props.overflow,
        rows: props.rows,
        scroll: ref.value?.scrollTop ?? 0,
        width: {
          container: ref.value?.clientWidth ?? 0
        },
        height: {
          item: props.item.height,
          container: ref.value?.clientHeight ?? 0
        }
      });

      if (grid.height !== prev) {
        prev = grid.height;
        if (ref.value) ref.value.scrollTop = 0;
      }

      return (
        <div class="VirtualGrid" ref={ref}>
          <ul style={{ height: `${grid.height}px` }}>
            {grid.cells.map(cell => (
              <li
                key={cell.data}
                style={{
                  top: `${cell.position.top}px`,
                  left: `${cell.position.left}px`,
                  width: `${cell.position.width}px`,
                  height: `${cell.position.height}px`
                }}
              >
                {props.item.render(cell.data, cell.index)}
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
    }, { passive: true, signal });

    ref.value?.addEventListener('scroll', update, { passive: true, signal });
  });

  component.unmount(() => {
    abort();
  });

  return component;
};

export default VirtualGrid;
