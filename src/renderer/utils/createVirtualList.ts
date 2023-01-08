export type Skeleton = {
  index: number
  top: number
  height: number
};

export type VirtualListOptions = {
  size: number
  height: number | ((index: number, width: number) => number)
  overflow: number
};

const createVirtualList = (
  root: Element,
  options: VirtualListOptions
) => {
  const skeletons = Array(options.size).fill(0)
    .reduce<Skeleton[]>((acc, _, i) => {
      acc.push({
        index: i,
        top: i === 0 ?
          0 :
          acc[i - 1].top + acc[i - 1].height,
        height: typeof options.height === 'function' ?
          options.height(i, root.clientWidth) :
          options.height
      });

      return acc;
    }, []);

  const min = skeletons.findIndex(skeleton => skeleton.top >= root.scrollTop);
  const max = skeletons.findIndex(skeleton => skeleton.top >= root.scrollTop + root.clientHeight);

  const view = skeletons.slice(
    Math.max(0, min - options.overflow),
    Math.min(skeletons.length, max === -1 ?
      skeletons.length :
      max + options.overflow)
  );

  return ({
    height: skeletons[skeletons.length - 1].top + skeletons[skeletons.length - 1].height,
    skeletons,
    view
  });
};

export default createVirtualList;
