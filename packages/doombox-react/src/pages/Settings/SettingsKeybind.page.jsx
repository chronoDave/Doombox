import React from 'react';

// Core
import { Box } from '@material-ui/core';

import { Button } from '../../components';

// Modules
import { FormKeybind } from '../../modules';

const SettingsKeybind = () => (
  <Box display="flex" flexDirection="column">
    <FormKeybind>
      <Button>
        Submit
      </Button>
    </FormKeybind>
  </Box>
);

export default SettingsKeybind;
