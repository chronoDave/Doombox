import { Children, cloneElement } from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';

// Hooks
import { useTheme } from '../../hooks';

const Hidden = ({ children, on }) => {
  const theme = useTheme();

  return Children.map(children, child => cloneElement(child, {
    className: cx(child.props.className, css({
      [on(theme.breakpoints)]: {
        display: 'none'
      }
    }))
  }));
};

Hidden.propTypes = {
  children: PropTypes.node.isRequired,
  on: PropTypes.func.isRequired
};

export default Hidden;
