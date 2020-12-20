import { Children, cloneElement } from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';

// Hooks
import { useTheme } from '../../hooks';

const Hidden = ({ children, on }) => {
  const theme = useTheme();

  return Children.map(children, child => cloneElement(child, {
    className: cx(
      child.props.className,
      typeof on === 'function' ? css({
        [on(theme.breakpoints)]: {
          display: 'none'
        }
      }) : ({
        [css({ display: 'none' })]: on === process.platform
      })
    )
  }));
};

Hidden.propTypes = {
  children: PropTypes.node.isRequired,
  on: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf([
      'aix',
      'darwin',
      'freebsd',
      'linux',
      'openbsd',
      'sunos',
      'win32'
    ])
  ]).isRequired
};

export default Hidden;
