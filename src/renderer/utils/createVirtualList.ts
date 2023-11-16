import type { Rect } from '../../types/primitives';

import { binarySearchLeft } from '../../utils/array/binarySearch';
import fill from '../../utils/array/fill';

export type Column<T> = {
  data: T
  index: number
  position: {
    top: number
    height: number
  }
};

export type VirtualList<T> = {
  height: number
  columns: Array<Column<T>>
};

export type VirtualListOptions<T> = {
  data: T[]
  scroll: number
  overscroll: number
  container: Rect
  item: {
    height: (data: T, container: Rect) => number
  }
};

const createVirtualList = <T>(options: VirtualListOptions<T>): VirtualList<T> => {
  const columns = fill<Column<T>>(options.data.length, (i, arr) => ({
    data: options.data[i],
    index: i,
    position: {
      top: i !== 0 ?
        arr[i - 1].position.top + arr[i - 1].position.height :
        0,
      height: options.item.height(options.data[i], options.container)
    }
  }));

  const min = binarySearchLeft(
    columns,
    () => options.scroll,
    column => column.position.top
  );
  const max = binarySearchLeft(
    columns,
    () => options.scroll + options.container.height,
    column => column.position.top
  );

  return ({
    height: columns[columns.length - 1]?.position.top ?? 0,
    columns: columns.slice(
      Math.max(0, min - options.overscroll),
      max === -1 ?
        columns.length :
        Math.min(columns.length, max + options.overscroll)
    )
  });
};

export default createVirtualList;
