import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Core
import { Box } from '@material-ui/core';

import { Typography } from '../../../Typography';
import { FormUpdateAppearance } from '../../../Form';

const AppearanceView = () => {
  const [edit, setEdit] = useState(false);
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
