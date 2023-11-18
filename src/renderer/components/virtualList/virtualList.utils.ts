import type { Rect } from '../../../types/primitives';

import { binarySearchLeft } from '../../../utils/array/binarySearch';
import fill from '../../../utils/array/fill';

export type Cell<T> = {
  data: T
  y: number
  height: number
};

export type VirtualList<T> = {
  height: number
  cells: Array<Cell<T>>
};

export type VirtualListOptions<T> = {
  data: T[]
  scroll: number
  container: Rect
  cell: {
    height: (data: T) => number
  }
};

export const createVirtualList = <T>(options: VirtualListOptions<T>): VirtualList<T> => {
  const columns = fill<Cell<T>>(options.data.length, (i, arr) => {
    const prev: Cell<T> | undefined = arr[i - 1];
    const data = options.data[i];
    const y = (prev?.y ?? 0) + (prev?.height ?? 0);

    return ({ data, y, height: options.cell.height(data) });
  });

  const min = binarySearchLeft(
    columns,
    () => options.scroll,
    column => column.y
  );
  const max = binarySearchLeft(
    columns,
    () => options.scroll + options.container.height,
    column => column.y
  );

  return ({
    height: columns[columns.length - 1]?.y ?? 0,
    cells: columns.slice(
      Math.max(0, min),
      max === -1 ?
        columns.length :
        Math.min(columns.length, max)
    )
  });
};
