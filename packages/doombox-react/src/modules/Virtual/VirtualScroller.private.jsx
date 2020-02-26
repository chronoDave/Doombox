import React, {
  useState,
  useEffect,
  useRef,
  cloneElement,
  useLayoutEffect,
  createRef
} from 'react';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';

const VirtualScroller = ({ onScroll, width, children }) => {
  const ref = createRef();
  const innerRef = createRef();

  const previousWidth = useRef(width);
  const previousInnerHeight = useRef();

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

    const maxHeight = innerRef.current.scrollHeight - containerHeight;
    const scrollDirection = deltaY > 0 ? 'forward' : 'backward';

    const isScrollUp = (position <= 0 && deltaY < 0);
    const isScrollDown = (position >= maxHeight && deltaY > 0 && !scrollUpdateWasRequested);

    if (isScrollUp || isScrollDown) {
      setDirection(scrollDirection);
      onScroll(scrollDirection);
    }
  };

  const handleResize = debounce(container => container.resetAfterIndex(0), 200);

  /**
   * Only update when width changes
   */
  useEffect(() => {
    if (ref.current && previousWidth.current !== width) {
      handleResize(ref.current);
      previousWidth.current = width;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, handleResize]);

  /**
   * Only update when the library changes
   * Reset index cache as well, because of https://github.com/bvaughn/react-window/issues/147
   */
  useLayoutEffect(() => {
    if (ref.current && innerRef.current) {
      if (previousInnerHeight.current !== innerRef.current.scrollHeight) {
        ref.current.resetAfterIndex(0);
        // Hard-coded for now, as the ref doesn't update properly (it keeps old state)
        ref.current.scrollTo(direction === 'backward' ? 10000 : 0);
        // Clear direction cache, as rerender can occur outside of scrolling
        previousInnerHeight.current = innerRef.current.clientHeight;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innerRef]);

  return (
    <div onWheel={handleScroll}>
      {cloneElement(children, { ref, innerRef })}
    </div>
  );
};

VirtualScroller.propTypes = {
  onScroll: PropTypes.func.isRequired,
  width: PropTypes.number,
  children: PropTypes.element.isRequired
};

VirtualScroller.defaultProps = {
  width: null
};

export default VirtualScroller;
