import { binarySearchRight } from "../../utils/array/binarySearch";
import fill from "../../utils/array/fill";

export type Skeleton = {
  index: number
  top: number
  height: number
};

export type ViewFrame = {
  height: number
  items: Skeleton[]
};

export type ViewFrameOptions = {
  size: number
  overflow: number
  item: {
    height: number
  }
  container: {
    width: number
    height: number
    y: number
  }
};

const createViewFrame = ({
  size,
  overflow,
  item,
  container
}: ViewFrameOptions): ViewFrame => {
  const skeletons = fill<Skeleton>(size, (i, arr) => ({
    index: i,
    top: i !== 0 ?
      arr[i - 1].top + arr[i - 1].height :
      0,
    height: item.height
  }));

  const min = binarySearchRight(skeletons, container.y, ({ top }) => top) + 1;
  const max = binarySearchRight(
    skeletons,
    container.y + container.height,
    ({ top }) => top
  ) + 1;

  const view = skeletons.slice(
    Math.max(0, min - overflow),
    Math.min(skeletons.length - 1, max === -1 ?
      skeletons.length :
      max + overflow)
  );

  console.group('createViewFrame');
  console.log('size', size);
  console.log('view', view);
  console.log('max', max);
  console.groupEnd();

  return ({
    height: skeletons[skeletons.length - 1]?.top ?? 0,
    items: view
  });
};

export default createViewFrame;
