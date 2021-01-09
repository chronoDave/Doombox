import React, {
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';
import PropTypes from 'prop-types';

// Styles
import useVirtualListStyles from './VirtualList.styles';

const VirtualList = props => {
  const {
    length,
    size,
    scrollTo,
    children
  } = props;
  const [virtual, setVirtual] = useState({ total: 0, items: [] });
  const [view, setView] = useState([]);

  const ref = useRef();
  const classes = useVirtualListStyles({ height: virtual.total });

  const virtualize = useCallback(() => {
    const { scrollTop, clientHeight } = ref.current;

    const min = virtual.items.findIndex(item => item.style.top >= scrollTop);
    const max = virtual.items.findIndex(item => item.style.top >= scrollTop + clientHeight);

    setView(virtual.items.slice(
      Math.max(0, min - 1),
      max === -1 ?
        virtual.items.length :
        max
    ));
  }, [virtual.items]);

  const getItems = useCallback(() => {
    const items = [];
    let top = 0;

    for (let index = 0; index < length; index += 1) {
      const height = typeof size === 'function' ?
        size(index, ref.current.clientWidth) :
        size;

      items.push({
        index,
        style: {
          position: 'absolute',
          width: '100%',
          top,
          height
        }
      });
      top += height;
    }

    setVirtual({ total: top, items });
  }, [length, size]);

  useEffect(() => {
    getItems();
    window.addEventListener('resize', getItems);

    return () => window.removeEventListener('resize', getItems);
  }, [getItems]);

  useEffect(() => {
    virtualize();
  }, [virtualize]);

  useEffect(() => {
    if (scrollTo) ref.current.scrollTo({ top: virtual.items[scrollTo].style.top });
  }, [scrollTo, virtual.items]);

  return (
    <div
      ref={ref}
      className={classes.root}
      onScroll={virtualize}
    >
      <div className={classes.body}>
        {view.map(children)}
      </div>
    </div>
  );
};

VirtualList.defaultProps = {
  scrollTo: null
};

VirtualList.propTypes = {
  length: PropTypes.number.isRequired,
  scrollTo: PropTypes.number,
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func
  ]).isRequired,
  children: PropTypes.func.isRequired
};

export default VirtualList;
