import { Children, cloneElement } from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';

// Hooks
import { useTheme } from '../../hooks';

const Hidden = ({ children, on, platform }) => {
  const theme = useTheme();

  return Children.map(children, child => cloneElement(child, {
    className: cx(
      child.props.className,
      typeof on === 'function' && css({
        [on(theme.breakpoints)]: {
          display: 'none'
        }
      }),
      ({ [css({ display: 'none' })]: platform === process.platform })
    )
  }));
};

Hidden.defaultProps = {
  on: null,
  platform: null
};

Hidden.propTypes = {
  children: PropTypes.node.isRequired,
  on: PropTypes.func,
  platform: PropTypes.oneOf([
    'aix',
    'darwin',
    'freebsd',
    'linux',
    'openbsd',
    'sunos',
    'win32'
  ])
};

export default Hidden;
