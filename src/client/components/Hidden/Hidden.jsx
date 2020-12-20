import { Children, cloneElement } from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';

// Hooks
import { useTheme } from '../../hooks';

const Hidden = ({ children, on, platform }) => {
  const theme = useTheme();

  const createBreakpoint = () => typeof on === 'function' && css({
    [on(theme.breakpoints)]: {
      display: 'none'
    }
  });

  return Children.map(children, child => cloneElement(child, {
    className: cx(child.props.className, {
      [css({ display: 'none' })]: process.platform === platform,
    }, createBreakpoint())
  }));
};

Hidden.propTypes = {
  children: PropTypes.node.isRequired,
  on: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf([
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
