import React from 'react';

// Core
import { useTheme as useMuiTheme } from '@material-ui/core/styles';
import {
  Box,
  Typography
} from '@material-ui/core';

import { Switch } from '../../components';

// Modules
import { FormCreatePalette } from '../../modules';

// Hook
import {
  useTheme,
  useIpc
} from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

const SettingsPalette = () => {
  const theme = useMuiTheme();
  const { setDarkTheme } = useTheme();
  const { palette: { backgroundOpacity } } = useIpc(HOOK.IPC.CONFIG);
  const { setBackgroundOpacity } = useIpc(HOOK.IPC.METHOD);

  return (
    <Box display="flex" flexDirection="column">
      <Switch
        primary="Enable dark theme"
        checked={theme.palette.type === 'dark'}
        onChange={event => setDarkTheme(event.target.checked)}
        maxWidth={480}
      />
      <Switch
        primary="Disable background opacity"
        checked={!backgroundOpacity}
        onChange={() => setBackgroundOpacity(!backgroundOpacity)}
        maxWidth={480}
      />
      <Box py={1} color="grey.500">
        <Typography variant="subtitle1">
          Theme
        </Typography>
      </Box>
      <FormCreatePalette />
    </Box>
  );
};

export default SettingsPalette;
