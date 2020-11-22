import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';
import PropTypes from 'prop-types';

// Styles
import useVirtualListStyles from './VirtualList.styles';

const VirtualList = forwardRef((props, ref) => {
  const {
    data,
    item,
    overscroll,
    children
  } = props;
  const [sliceIndex, setSliceIndex] = useState([0, 0]);
  const [height, setHeight] = useState({ items: [], cumulative: [], total: 0 });

  const innerRef = useRef();
  const containerRef = useRef();
  const rootRef = ref || innerRef;

  const virtualize = useCallback(window => {
    const indexStart = Math.max(0, height.cumulative.findIndex(itemHeight => itemHeight > window.y) - 1);

    const indexEndCumulative = height.cumulative.findIndex(cHeight => cHeight > window.y + window.height);
    const indexEnd = indexEndCumulative < 0 ?
      data.length :
      Math.min(data.length, indexEndCumulative + overscroll);

    setSliceIndex([indexStart, indexEnd]);
  }, [data, height, overscroll]);

  const getHeight = useCallback(() => {
    if (containerRef && containerRef.current) {
      const itemHeights = typeof item.height === 'function' ? (
        data.map((itemData, i) => item.height({
          data: itemData,
          width: containerRef.current.getBoundingClientRect().width,
          index: i
        }))
      ) : data.map(() => item.height);

      setHeight({
        items: itemHeights,
        cumulative: itemHeights.reduce((acc, cur) => ([...acc, acc.pop() + cur]), [0]),
        total: itemHeights.reduce((acc, cur) => acc + cur, 0)
      });
    }
  }, [data, item]);

  const classes = useVirtualListStyles({ height: height.total });

  useEffect(() => {
    if (rootRef && rootRef.current) {
      virtualize({
        y: rootRef.current.scrollTop,
        height: rootRef.current.getBoundingClientRect().height
      });
    }
  }, [rootRef, virtualize, height]);

  useEffect(() => {
    getHeight();

    window.addEventListener('resize', getHeight);

    return () => window.removeEventListener('resize', getHeight);
  }, [getHeight]);

  return (
    <div
      ref={rootRef}
      className={classes.root}
      onScroll={event => virtualize({
        y: event.currentTarget.scrollTop,
        height: event.currentTarget.getBoundingClientRect().height
      })}
    >
      <div className={classes.container} ref={containerRef}>
        {data.slice(sliceIndex[0], sliceIndex[1]).map((itemData, i) => {
          const index = sliceIndex[0] + i;

          return children({
            index,
            data: itemData,
            style: {
              position: 'absolute',
              top: height.cumulative[index],
              width: '100%',
              height: height.items[index]
            }
          });
        })}
      </div>
    </div>
  );
});

VirtualList.defaultProps = {
  overscroll: 1
};

VirtualList.propTypes = {
  data: PropTypes.array.isRequired,
  item: PropTypes.shape({
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func
    ]).isRequired
  }).isRequired,
  overscroll: PropTypes.number,
  children: PropTypes.func.isRequired
};

export default VirtualList;
