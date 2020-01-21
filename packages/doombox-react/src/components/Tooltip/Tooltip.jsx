import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { Tooltip as MuiTooltip } from '@material-ui/core';

import { Typography } from '../Typography';

// Styles
import { useTooltipStyles } from './Tooltip.style';

const Tooltip = ({
  disableTranslation,
  title,
  children,
  ...rest
}) => {
  const { t } = useTranslation();
  const classes = useTooltipStyles();

  return (
    <MuiTooltip
      title={(
        <Typography variant="caption">
          {disableTranslation ? title : t(title)}
        </Typography>
      )}
      arrow
      classes={{
        tooltip: classes.root,
        arrow: classes.arrow
      }}
      {...rest}
    >
      {children}
    </MuiTooltip>
  );
};

Tooltip.propTypes = {
  disableTranslation: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};

Tooltip.defaultProps = {
  disableTranslation: false,
};

export default Tooltip;
