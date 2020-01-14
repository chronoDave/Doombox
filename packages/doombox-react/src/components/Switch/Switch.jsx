import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Core
import {
  Switch as MuiSwitch,
  Box,
  Typography
} from '@material-ui/core';

const Switch = props => {
  const {
    primary,
    secondary,
    checked,
    onChange,
    translate,
    id,
    disabled
  } = props;
  const { t } = useTranslation();

  return (
    <Box display="flex" p={1} justifyContent="space-between">
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Typography gutterBottom={!!secondary}>
          {translate ? t(`field:${translate}`) : primary}
        </Typography>
        {(translate || secondary) && (
          <Typography variant="body2">
            {translate ? t(`description:field_${translate}`) : secondary}
          </Typography>
        )}
      </Box>
      <MuiSwitch
        disabled={disabled}
        inputProps={{ id: id || primary }}
        checked={checked}
        onChange={onChange}
        color="primary"
      />
    </Box>
  );
};

Switch.propTypes = {
  disabled: PropTypes.bool,
  primary: PropTypes.string,
  secondary: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  translate: PropTypes.string,
  id: PropTypes.string
};

Switch.defaultProps = {
  disabled: false,
  primary: null,
  secondary: null,
  id: null,
  translate: null
};

export default Switch;
