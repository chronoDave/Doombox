import {
  Children,
  cloneElement,
  useState,
  useEffect
} from 'react';
import { cx } from '@doombox-utils';
import PropTypes from 'prop-types';

// Hooks
import { useTimeout } from '../../hooks';

// Theme
import { transitions } from '../../theme';

import './Fade.scss';

const Fade = ({ visible, delay, children }) => {
  const [hidden, setHidden] = useState(false);

  const [hide, cancelHide] = useTimeout(() => setHidden(true), delay);

  useEffect(() => {
    if (visible) {
      cancelHide();
      setHidden(false);
    } else {
      hide();
    }
  }, [visible, hide, cancelHide]);

  return Children.map(children, child => cloneElement(child, {
    style: {
      ...(child.props.style || {}),
      transition: transitions.create(['opacity'], delay)
    },
    className: cx(
      'Fade',
      !visible && 'invisible',
      hidden && 'hidden',
      child.props.className
    )
  }));
};

Fade.defaultProps = {
  visible: false,
  delay: transitions.durations.shortest
};

Fade.propTypes = {
  visible: PropTypes.bool,
  delay: PropTypes.number,
  children: PropTypes.node.isRequired
};

export default Fade;
