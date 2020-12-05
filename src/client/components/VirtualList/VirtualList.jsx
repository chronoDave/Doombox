import React, {
  forwardRef,
  useState,
  useEffect,
  useRef
} from 'react';
import { getCumulative } from '@doombox-utils';
import PropTypes from 'prop-types';

// Styles
import useVirtualListStyles from './VirtualList.styles';

const getViewTuple = ({ container, height, overscroll }) => {
  /**
   * Find smallest cumulative height that's larger than the current scroll position,
   * and remove 1, as the previous item is still (partly) visible
   *
   * Can return -1
   */
  const indexStart = height.cumulative
    .findIndex(cumulativeHeight => cumulativeHeight > container.y) - 1;

  /**
   * Find smallest cumulative height that's larger than the container height + scroll position,
   * overflow is desired, so no need to remove 1
   *
   * Can return -1
   */
  const indexEnd = height.cumulative
    .findIndex(cumulativeHeight => cumulativeHeight > container.y + container.height);

  /** Start index must always be at least 0 */
  const normalizedIndexStart = Math.max(0, indexStart - overscroll);

  /**
   * End index must always be at least 0
   * If total height is small than container height, return max index
   * */
  const normalizedIndexEnd = height.total <= container.height ?
    Math.max(0, height.cumulative.length - 1) :
    Math.max(0, indexEnd + overscroll);

  return ([normalizedIndexStart, normalizedIndexEnd]);
};

const VirtualList = forwardRef((props, outerRef) => {
  const {
    data,
    overscroll,
    itemHeight,
    children
  } = props;
  const [viewTuple, setViewTuple] = useState([0, 0]);
  const [height, setHeight] = useState({
    children: [],
    cumulative: [],
    total: 0
  });

  const innerRef = useRef();
  const refContainer = useRef();
  const ref = outerRef || innerRef;

  const classes = useVirtualListStyles({ height: height.total });

  useEffect(() => {
    const getHeights = container => {
      const heights = typeof itemHeight === 'number' ?
        data.map(() => itemHeight) :
        data.map((childData, index) => itemHeight({
          data: childData,
          container,
          index
        }));

      setHeight({
        children: heights,
        cumulative: getCumulative(heights, 0),
        total: heights.reduce((acc, cur) => acc + cur, 0)
      });
    };

    if (ref && ref.current && refContainer && refContainer.current) {
      const container = refContainer.current.getBoundingClientRect();

      getHeights(container);
      window.addEventListener('resize', () => getHeights(container));
    }

    return () => window.removeEventListener('resize', getHeights);
  }, [ref, itemHeight, data]);

  useEffect(() => {
    if (ref && ref.current) {
      setViewTuple(getViewTuple({
        overscroll,
        height,
        container: {
          y: ref.current.scrollTop,
          height: ref.current.getBoundingClientRect().height
        }
      }));
    }
  }, [ref, height, overscroll]);

  return (
    <div
      ref={ref}
      className={classes.root}
      onScroll={event => setViewTuple(getViewTuple({
        overscroll,
        height,
        container: {
          y: event.currentTarget.scrollTop,
          height: event.currentTarget.getBoundingClientRect().height
        }
      }))}
    >
      <div ref={refContainer} className={classes.container}>
        {data.slice(viewTuple[0], viewTuple[1]).map((childData, i) => {
          const index = viewTuple[0] + i;

          return children({
            index,
            data: childData,
            style: {
              position: 'absolute',
              top: height.cumulative[index],
              width: '100%',
              height: height.children[index]
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
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  overscroll: PropTypes.number,
  itemHeight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func
  ]).isRequired,
  children: PropTypes.func.isRequired
};

export default VirtualList;
