import React, {
  forwardRef,
  useState,
  useEffect,
  useCallback,
  useRef
} from 'react';
import { getCumulative } from '@doombox-utils';
import PropTypes from 'prop-types';

// Styles
import useVirtualListStyles from './VirtualList.styles';

const VirtualList = forwardRef((props, outerRef) => {
  const { data, itemHeight, children } = props;
  const [view, setView] = useState({ min: 0, max: 0 });
  const [height, setHeight] = useState({
    children: [],
    cumulative: [],
    total: 0
  });

  const innerRef = useRef();
  const refContainer = useRef();
  const ref = outerRef || innerRef;

  const classes = useVirtualListStyles({ height: height.total });

  const getView = useCallback(container => {
    // Get smallest / largest cumulative height based on scroll position
    const indexStart = Math.max(0, height.cumulative
      .findIndex(item => item > container.y) - 1);
    const indexEnd = Math.max(0, height.cumulative
      .findIndex(item => item >= container.y + container.height));

    return ({
      min: indexStart,
      max: Math.min(Math.max(0, height.children.length), indexEnd)
    });
  }, [height]);

  useEffect(() => {
    const updateHeight = () => {
      const heights = data.map((childData, index) => itemHeight({
        data: childData,
        width: refContainer.current.getBoundingClientRect().width,
        index
      }));

      setHeight({
        children: heights,
        cumulative: getCumulative(heights),
        total: heights.reduce((acc, cur) => acc + cur, 0)
      });
    };

    updateHeight();

    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [data, itemHeight]);

  useEffect(() => {
    setView(getView({
      y: ref.current.scrollTop,
      height: ref.current.getBoundingClientRect().height
    }));
  }, [ref, height, getView]);

  return (
    <div
      ref={ref}
      className={classes.root}
      onScroll={event => {
        const newView = getView({
          y: event.currentTarget.scrollTop,
          height: event.currentTarget.getBoundingClientRect().height
        });

        if (newView.min !== view.min || newView.max !== view.max) setView(newView);
      }}
    >
      <div ref={refContainer} className={classes.body}>
        {data.slice(view.min, view.max).map((childData, i) => {
          const index = view.min + i;

          return children({
            index,
            data: childData,
            style: {
              position: 'absolute',
              top: Number.isFinite(height.cumulative[index]) ?
                height.cumulative[index] :
                0,
              width: '100%',
              height: height.children[index]
            }
          });
        })}
      </div>
    </div>
  );
});

VirtualList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  itemHeight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func
  ]).isRequired,
  children: PropTypes.func.isRequired
};

VirtualList.displayName = 'VirtualList';
export default VirtualList;
