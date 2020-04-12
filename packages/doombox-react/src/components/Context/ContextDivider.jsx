import React from 'react';

// Styles
import { useContextStyles } from './Context.style';

const ContextDivider = () => {
  const classes = useContextStyles();

  return <div className={classes.dividerLine} />;
};

export default ContextDivider;
