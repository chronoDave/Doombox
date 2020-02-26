import React, {
  useState,
  useLayoutEffect,
  cloneElement,
  createRef
} from 'react';
import PropTypes from 'prop-types';

// Utils
import { getHeightFromStyle } from '../../utils';

const VirtualScroller = props => {
  const {
    onScroll,
    disableCacheReset,
    updateDep,
    children
  } = props;
  const ref = createRef();
  const innerRef = createRef();

  const [direction, setDirection] = useState(null);

  const handleScroll = ({ deltaY }) => {
    if (!innerRef.current || !ref.current) return;

    const {
      current: {
        props: { height: containerHeight },
        state: {
          scrollOffset: position,
          scrollUpdateWasRequested
        }
      }
    } = ref;

    const maxHeight = getHeightFromStyle(innerRef.current) - containerHeight;
    const scrollDirection = deltaY > 0 ? 'forward' : 'backward';

    const isScrollUp = (position <= 0 && deltaY < 0);
    const isScrollDown = (position >= maxHeight && deltaY > 0 && !scrollUpdateWasRequested);

    if (isScrollUp || isScrollDown) {
      setDirection(scrollDirection);
      onScroll(scrollDirection);
    }
  };

  /**
   * Only update when the library changes
   * and when it finished drawing
   * Reset index cache as well, because of https://github.com/bvaughn/react-window/issues/147
   */
  useLayoutEffect(() => {
    if (ref.current && innerRef.current) {
      if (!disableCacheReset) ref.current.resetAfterIndex(0);
      if (direction) {
        const height = getHeightFromStyle(innerRef.current);
        // Short-circuit, so it also applies on initial render
        ref.current.scrollTo(direction === 'backward' ? height : 0);
        // Clear direction cache, as rerender can occur outside of scrolling
        setDirection(null);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateDep]);

  return (
    <div onWheel={handleScroll}>
      {cloneElement(children, { ref, innerRef })}
    </div>
  );
};

VirtualScroller.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  updateDep: PropTypes.any.isRequired, // Can be actually anything
  onScroll: PropTypes.func.isRequired,
  disableCacheReset: PropTypes.bool,
  children: PropTypes.element.isRequired
};

VirtualScroller.defaultProps = {
  disableCacheReset: false
};

export default VirtualScroller;
