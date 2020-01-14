import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Styles
import { useImageStyles } from './Image.style';

const Image = props => {
  const {
    className,
    children,
    src,
    alt
  } = props;
  const classes = useImageStyles({ src });

  return (
    <div
      className={clsx(classes.root, className)}
      src={src}
      alt={alt}
    >
      {children}
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string.isRequired,
  children: PropTypes.node
};

Image.defaultProps = {
  src: null,
  children: null,
  alt: 'Default image'
};

export default Image;
