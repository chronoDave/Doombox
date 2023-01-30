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
  const skeletons = Array.from({ length: size })
    .reduce<Skeleton[]>((acc, _, i) => {
      acc.push({
        index: i,
        top: i === 0 ?
          0 :
          acc[i - 1].top + acc[i - 1].height,
        height: item.height
      });

      return acc;
    }, []);

  const min = skeletons.findIndex(skeleton => skeleton.top >= container.y);
  const max = skeletons.findIndex(skeleton => skeleton.top >= container.y + container.height);

  const view = skeletons.slice(
    Math.max(0, min - overflow),
    Math.min(skeletons.length, max === -1 ?
      skeletons.length :
      max + overflow)
  );

  const last = skeletons[skeletons.length - 1];

  return ({
    height: last.top + last.height,
    items: view
  });
};

export default createViewFrame;
