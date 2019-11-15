import React from 'react';
import { useTranslation } from 'react-i18next';

// Core
import { Box } from '@material-ui/core';

import { Typography } from '../../../components/Typography';
import { FormUpdateAppearance } from '../../../components/Form';

const AppearanceView = () => {
  const { t } = useTranslation();

  return (
    <Box p={3} display="flex" flexDirection="column">
      <Box pb={2}>
        <Typography variant="button">
          {t('background')}
        </Typography>
      </Box>
      <FormUpdateAppearance />
    </Box>
  );
};

export default AppearanceView;
