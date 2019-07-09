import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Icon
import IconError from '@material-ui/icons/ErrorOutline';

// Core
import { Box } from '@material-ui/core';

import { Typography } from '../Typography';

const FieldError = props => {
  const { errors, ...rest } = props;
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      alignItems="center"
      px={1}
      py={2}
      bgcolor="error.main"
      border={1}
      borderColor="error.dark"
      borderRadius={4}
      color="grey.0"
      {...rest}
    >
      <IconError />
      <Box px={1}>
        {errors.map(error => (
          <Typography
            key={error.key || error.message}
            paragraph
          >
            {t(error.message)}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

FieldError.propTypes = {
  errors: PropTypes.array.isRequired
};

export default FieldError;
