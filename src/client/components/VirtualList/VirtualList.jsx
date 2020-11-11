import React, {
  forwardRef,
  useState,
  useEffect,
  useCallback
} from 'react';
import PropTypes from 'prop-types';

// Styles
import useVirtualListStyles from './VirtualList.styles';

const VirtualList = forwardRef((props, ref) => {
  const {
    data,
    itemHeight,
    overscroll,
    children
  } = props;
  const [render, setRender] = useState(null);
  const classes = useVirtualListStyles({ height: (data.length - 1) * itemHeight });

  const virtualize = useCallback(scrollTop => {
    if (ref && ref.current) {
      const indexStart = Math.floor(scrollTop / itemHeight);
      const indexEnd = Math.min(
        data.length - 1,
        Math.floor((
          scrollTop +
          ref.current.getBoundingClientRect().height
        ) / itemHeight) + overscroll
      );

      const newRender = data
        .slice(indexStart, indexEnd)
        .map((item, i) => children({
          data: item,
          index: indexStart + i,
          style: {
            position: 'absolute',
            top: `${(indexStart + i) * itemHeight}px`,
            width: '100%'
          }
        }));

      setRender(newRender);
    }
  }, [ref, children, data, itemHeight, overscroll]);

  useEffect(() => {
    if (ref && ref.current) virtualize(ref.current.scrollTop);
  }, [ref, virtualize]);

  useEffect(() => {
    const handleResize = event => virtualize(event.currentTarget.scrollTop);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [virtualize]);

  return (
    <div
      ref={ref}
      className={classes.root}
      onScroll={event => virtualize(event.currentTarget.scrollTop)}
    >
      <div className={classes.container}>
        {render}
      </div>
    </div>
  );
});

VirtualList.defaultProps = {
  overscroll: 0
};

VirtualList.propTypes = {
  data: PropTypes.array.isRequired,
  overscroll: PropTypes.number,
  itemHeight: PropTypes.number.isRequired,
  children: PropTypes.func.isRequired
};

export default VirtualList;
