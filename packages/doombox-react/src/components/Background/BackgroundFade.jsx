import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Styles
import { useBackgroundStyle } from './Background.style';

const BackgroundFade = ({ children, opacity }) => {
  const classes = useBackgroundStyle({ opacity });

  return (
    <div className={clsx(classes.root, classes.fade)}>
      {children}
    </div>
  );
};

BackgroundFade.propTypes = {
  children: PropTypes.node,
  opacity: PropTypes.number
};

BackgroundFade.defaultProps = {
  children: null,
  opacity: 0.66
};

export default BackgroundFade;
