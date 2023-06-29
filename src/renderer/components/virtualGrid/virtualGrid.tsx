import * as forgo from 'forgo';

import createVirtualGrid from '../../utils/createVirtualGrid';
import debounce from '../../utils/debounce';

export type VirtualGridProps<T> = {
  list: T[]
  item: {
    width: number
    height?: number
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
        overscroll: 1,
        scroll: ref.value?.scrollTop ?? 0,
        container: {
          width: ref.value?.clientWidth ?? 0,
          height: ref.value?.clientHeight ?? 0
        },
        item: {
          width: props.item.width,
          height: props.item.height
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

    update();
  });

  component.unmount(() => {
    abort();
  });

  return component;
};

export default VirtualGrid;
