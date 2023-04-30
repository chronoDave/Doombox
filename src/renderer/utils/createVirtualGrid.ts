import { binarySearchRight } from '../../utils/array/binarySearch';
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
  overflow: number
  scroll: number
  rows: number
  width: {
    container: number
  }
  height: {
    item: number
    container: number
  }
};

const createVirtualGrid = <T>(options: VirtualGridOptions<T>): VirtualGrid<T> => {
  const cells = fill<Cell<T>>(options.data.length, (i, arr) => {
    const row = i % options.rows;

    return ({
      data: options.data[i],
      index: i,
      position: {
        top: i > options.rows - 1 ?
          arr[i - 1 - row].position.top + arr[i - 1 - row].position.height :
          0,
        height: options.height.item,
        left: row * (options.width.container / options.rows),
        width: options.width.container / options.rows
      }
    });
  });

  const min = binarySearchRight(
    cells,
    options.scroll,
    cell => cell.position.top
  ) + 1;
  const max = binarySearchRight(
    cells,
    options.scroll + options.height.container,
    cell => cell.position.top
  ) + 1;

  return ({
    height: cells[cells.length - 1]?.position.top ?? 0,
    cells: cells.slice(
      Math.max(0, min - options.overflow),
      Math.min(cells.length - 1, max === -1 ?
        cells.length :
        max + options.overflow)
    )
  });
};

export default createVirtualGrid;
