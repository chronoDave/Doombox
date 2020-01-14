import React from 'react';

// Core
import { Box } from '@material-ui/core';

import { Button } from '../../components';

// Modules
import { FormDiscord } from '../../modules';

const SettingsDiscord = () => (
  <Box display="flex" flexDirection="column">
    <FormDiscord>
      <Button>
        Submit
      </Button>
    </FormDiscord>
  </Box>
);

export default SettingsDiscord;
