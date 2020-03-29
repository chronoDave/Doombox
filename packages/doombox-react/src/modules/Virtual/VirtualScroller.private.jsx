import React, {
  useEffect,
  useRef,
  cloneElement,
  createRef
} from 'react';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';

const VirtualScroller = ({ onScroll, width, children }) => {
  const ref = createRef();
  const innerRef = createRef();

  // const previousProps = useRef({ width });
  const previousWidth = useRef(width);
  const previousItemCount = useRef();

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
      onScroll(scrollDirection);

      if (ref.current) {
        ref.current.resetAfterIndex(0); // Reset size cache
        ref.current.scrollTo(deltaY < 0 ? 1000000 : 0);
      }
    }
  };

  const handleResize = debounce(container => container.resetAfterIndex(0), 200);

  useEffect(() => {
    if (ref.current) {
      // Resize on width change
      if (
        previousWidth.current &&
        previousWidth.current !== width
      ) {
        handleResize(ref.current);
      }
      // Rsize on content change
      if (
        previousItemCount.current &&
        previousItemCount.current !== ref.current.props.itemCount
      ) {
        handleResize(ref.current);
      }

      previousItemCount.current = ref.current.props.itemCount;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, handleResize]);

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
