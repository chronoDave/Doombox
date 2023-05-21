import { binarySearchLeft } from '../../utils/array/binarySearch';
import fill from '../../utils/array/fill';

export type Cell<T> = {
  data: T
  index: number
  position: {
    top: number
    left: number
    width: number
    height: number
  }
};

export type VirtualGrid<T> = {
  height: number
  cells: Array<Cell<T>>
};

export type VirtualGridOptions<T> = {
  data: T[],
  scroll: number
  overscroll: number
  container: {
    width: number
    height: number
  }
  item: {
    width: number
    height?: number
  }
};

const createVirtualGrid = <T>(options: VirtualGridOptions<T>): VirtualGrid<T> => {
  const rows = Math.max(1, Math.floor(options.container.width / options.item.width));
  const cells = fill<Cell<T>>(options.data.length, (i, arr) => {
    const row = i % rows;
    const width = options.container.width / rows;

    return ({
      data: options.data[i],
      index: i,
      position: {
        top: i > rows - 1 ?
          arr[i - 1 - row].position.top + arr[i - 1 - row].position.height :
          0,
        left: row * (options.container.width / rows),
        height: options.item.height ?? width,
        width
      }
    });
  });

  const min = binarySearchLeft(
    cells,
    options.scroll,
    cell => cell.position.top
  );
  const max = binarySearchLeft(
    cells,
    options.scroll + options.container.height,
    cell => cell.position.top
  );

  return ({
    height: cells[cells.length - 1]?.position.top ?? 0,
    cells: cells.slice(
      Math.max(0, min - (rows * options.overscroll)),
      max === -1 ?
        cells.length :
        Math.min(cells.length, max + (rows * options.overscroll))
    )
  });
};

export default createVirtualGrid;
