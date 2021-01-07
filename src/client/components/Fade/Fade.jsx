import {
  Children,
  cloneElement,
  useState,
  useEffect
} from 'react';
import { cx } from 'emotion';

// Hooks
import { useTimeout } from '../../hooks';

// Theme
import { transitions } from '../../theme';

// Styles
import useFadeStyles from './Fade.styles';

const Fade = ({ visible, delay, children }) => {
  const [hidden, setHidden] = useState(false);

  const [hide, cancelHide] = useTimeout(() => setHidden(true), delay);
  const classes = useFadeStyles({ delay });

  useEffect(() => {
    if (visible) {
      cancelHide();
      setHidden(false);
    } else {
      hide();
    }
  }, [visible, hide, cancelHide]);

  return Children.map(children, child => cloneElement(child, {
    className: cx(
      child.props.className,
      classes.root,
      {
        [classes.invisible]: !visible,
        [classes.hidden]: hidden
      }
    )
  }));
};

Fade.defaultProps = {
  delay: transitions.durations.shortest
};

export default Fade;
