import type { Rect } from '../../../types/primitives';

import { binarySearchLeft } from '../../../utils/array/binarySearch';
import fill from '../../../utils/array/fill';

export type Cell<T> = {
  data: T
  dataset: { [key: `data_${string}`]: string }
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
    dataset?: (data: T) => Record<string, string>
    height: (data: T) => number
  }
};

export const createVirtualList = <T>(options: VirtualListOptions<T>): VirtualList<T> => {
  const columns = fill<Cell<T>>(options.data.length, (i, arr) => {
    const prev: Cell<T> | undefined = arr[i - 1];
    const data = options.data[i];
    const y = (prev?.y ?? 0) + (prev?.height ?? 0);

    return ({
      data,
      y,
      height: options.cell.height(data),
      dataset: Object.fromEntries(Object.entries(options.cell.dataset?.(data) ?? {}).map(([key, value]) => [`data_${key}`, value]))
    });
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
      Math.max(0, min - 1),
      max === -1 ?
        columns.length :
        Math.min(columns.length, max + 1)
    )
  });
};
