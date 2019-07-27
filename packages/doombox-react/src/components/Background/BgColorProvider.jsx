import React from 'react';
import PropTypes from 'prop-types';

const BgColorProvider = ({
  children,
  forceFullWidth,
  forceFullHeight,
  color,
  ...rest
}) => (
  <div
    style={{
      backgroundPosition: 'fixed',
      backgroundColor: color,
      top: 0,
      left: 0,
      width: forceFullWidth ? '100vw' : '100%',
      height: forceFullHeight ? '100vh' : '100%',
    }}
    {...rest}
  >
    {children}
  </div>
);

BgColorProvider.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  forceFullWidth: PropTypes.bool,
  forceFullHeight: PropTypes.bool
};

BgColorProvider.defaultProps = {
  forceFullWidth: false,
  forceFullHeight: false
};

export default BgColorProvider;
