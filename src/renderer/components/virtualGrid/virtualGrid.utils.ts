import type { Rect } from '../../../types/primitives';

import { binarySearchLeft } from '../../../utils/array/binarySearch';
import fill from '../../../utils/array/fill';

export type Cell<T> = {
  data: T
  x: number
  y: number
  width: number
  height: number
};

export type VirtualGrid<T> = {
  height: number
  cells: Array<Cell<T>>
};

export type VirtualGridOptions<T> = {
  data: T[],
  scroll: number
  container: Rect
  cell: {
    width: (data: T) => number | null
    height: (data: T) => number
  }
};

export const createVirtualGrid = <T>(options: VirtualGridOptions<T>): VirtualGrid<T> => {
  const getWidth = (data: T) => {
    const width = options.cell.width(data);
    if (!width) return options.container.width;

    const rows = Math.max(1, Math.floor(options.container.width / width));
    return Math.floor(options.container.width / rows);
  };

  const cells = fill<Cell<T>>(options.data.length, (i, arr) => {
    const prev: Cell<T> | undefined = arr[i - 1];
    const data = options.data[i];
    const width = getWidth(data);
    const x = (prev?.x ?? 0) + (prev?.width ?? 0);

    return ({
      data,
      x: x + width > options.container.width ? 0 : x,
      y: x + width > options.container.width ?
        (prev?.y ?? 0) + (prev?.height ?? 0) :
        (prev?.y ?? 0),
      width,
      height: options.cell.height(data)
    });
  });

  const min = binarySearchLeft(
    cells,
    cell => options.scroll - options.cell.height(cell.data),
    cell => cell.y
  );
  const max = binarySearchLeft(
    cells,
    cell => (
      options.scroll +
      options.container.height +
      options.cell.height(cell.data)
    ),
    cell => cell.y
  );

  return ({
    height: cells[cells.length - 1]?.y ?? 0,
    cells: cells.slice(
      Math.max(0, min - 1),
      max === -1 ?
        cells.length :
        Math.min(cells.length, max + 1)
    )
  });
};
