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

const VirtualList = forwardRef((props, outerRef) => {
  const {
    size,
    itemSize,
    children
  } = props;
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([]);
  const [view, setView] = useState({ min: 0, max: 0 });

  const innerRef = useRef();
  const ref = outerRef || innerRef;

  const classes = useVirtualListStyles({ height: total });

  const updateView = useCallback(({ y, height }) => {
    const max = items.findIndex(item => item.style.top >= y + height);

    setView({
      min: Math.max(0, items.findIndex(item => item.style.top >= y) - 1),
      max: max === -1 ?
        items.length :
        max
    });
  }, [items]);

  const updateItems = useCallback(() => {
    let newTotal = 0;
    const newItems = [];

    for (let i = 0; i < size; i += 1) {
      const item = typeof itemSize === 'number' ?
        itemSize :
        itemSize(i, ref.current.clientWidth);

      newItems.push({
        index: i,
        style: {
          position: 'absolute',
          top: newTotal,
          width: '100%',
          height: item
        }
      });
      newTotal += item;
    }

    setItems(newItems);
    setTotal(newTotal);
  }, [ref, size, itemSize]);

  useEffect(() => {
    updateItems();

    window.addEventListener('resize', updateItems);

    return () => window.removeEventListener('resize', updateItems);
  }, [updateItems]);

  useEffect(() => {
    updateView({
      y: ref.current.scrollTop,
      height: ref.current.clientHeight
    });

    ref.current.redraw = () => updateView({
      y: ref.current.scrollTop,
      height: ref.current.clientHeight
    });
  }, [ref, updateView]);

  return (
    <div
      ref={ref}
      className={classes.root}
      onScroll={event => updateView({
        y: event.currentTarget.scrollTop,
        height: event.currentTarget.clientHeight
      })}
    >
      <div className={classes.body}>
        {items.slice(view.min, view.max).map(children)}
      </div>
    </div>
  );
});

VirtualList.propTypes = {
  size: PropTypes.number.isRequired,
  itemSize: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func
  ]).isRequired,
  children: PropTypes.func.isRequired
};

VirtualList.displayName = 'VirtualList';
export default VirtualList;
