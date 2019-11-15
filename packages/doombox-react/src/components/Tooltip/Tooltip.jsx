import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

// Core
import { Tooltip as MuiTooltip } from '@material-ui/core';

import { Typography } from '../Typography';

// Style
import { useTooltipStyle } from './Tooltip.style';

const Tooltip = ({ title, ...rest }) => {
  const { arrow, ...classes } = useTooltipStyle();
  const [arrowRef, setArrowRef] = useState(null);

  return (
    <MuiTooltip
      classes={classes}
      PopperProps={{
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(arrowRef),
              element: arrowRef,
            },
          },
        },
      }}
      {...rest}
      title={(
        <Fragment>
          <Typography variant="caption">{title}</Typography>
          <span className={arrow} ref={setArrowRef} />
        </Fragment>
      )}
    />
  );
};

Tooltip.propTypes = {
  title: PropTypes.string.isRequired
};

export default Tooltip;
