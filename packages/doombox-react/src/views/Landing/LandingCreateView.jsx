import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  Card
} from '@material-ui/core';

import { Typography } from '../../components/Typography';
import { FormCreateProfile } from '../../components/Form';

const LandingCreateView = ({ view }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <Box pt={3}>
        <Typography variant="h6" align="center">
          {t('title:create', { context: view })}
        </Typography>
      </Box>
      <Box p={3} pb={2} minWidth={300}>
        <FormCreateProfile />
      </Box>
    </Card>
  );
};

LandingCreateView.propTypes = {
  view: PropTypes.string.isRequired
};

export default LandingCreateView;
