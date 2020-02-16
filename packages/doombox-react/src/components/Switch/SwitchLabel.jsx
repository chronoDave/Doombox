import React, { cloneElement } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { Typography } from '../Typography';

// Styles
import { useSwitchStyles } from './Switch.style';

const SwitchLabel = props => {
  const {
    id,
    name,
    primary,
    secondary,
    disableFullWidth,
    disableDescription,
    disabled,
    children
  } = props;

  const classes = useSwitchStyles();
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      width={!disableFullWidth && '100%'}
      p={1}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography color={!disabled ? 'textPrimary' : 'textSecondary'}>
          {primary || t(`field:${name}`)}
        </Typography>
        {(!disableDescription || secondary) && (
          <Typography
            variant="body2"
            color={!disabled ? 'textPrimary' : 'textSecondary'}
            className={classes.secondary}
          >
            {secondary || t(`description:field_${name}`)}
          </Typography>
        )}
      </Box>
      {cloneElement(children, {
        disabled,
        id,
        color: 'primary',
        inputProps: { id: `${id}-${name}` }
      })}
    </Box>
  );
};

SwitchLabel.propTypes = {
  id: PropTypes.string.isRequired,
  primary: PropTypes.string,
  secondary: PropTypes.string,
  disableDescription: PropTypes.bool,
  disabled: PropTypes.bool,
  disableFullWidth: PropTypes.bool,
  children: PropTypes.element.isRequired
};

SwitchLabel.defaultProps = {
  primary: null,
  secondary: null,
  disabled: false,
  disableFullWidth: false,
  disableDescription: false
};

export default SwitchLabel;
