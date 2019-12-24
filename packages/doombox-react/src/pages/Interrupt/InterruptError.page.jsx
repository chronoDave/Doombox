import React, {
  useEffect,
  useState
} from 'react';

// Icons
import IconError from '@material-ui/icons/Error';

// Core
import {
  Box,
  Typography,
  Button,
  Tooltip
} from '@material-ui/core';

// Hooks
import { useIpc } from '../../hooks';

// Utils
import { cleanErr } from '../../utils';
import { HOOK } from '../../utils/const';

const InterruptErrorPage = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({});
  const { err } = useIpc(HOOK.IPC.MESSAGE);

  useEffect(() => {
    if (err) {
      setError(JSON.parse(cleanErr(err)));
    }
  }, [err]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box mb={1}>
          <IconError fontSize="large" />
        </Box>
        <Typography variant="h6" paragraph>
          {error.code ? `${error.code} error` : 'An unknown exception occurred'}
        </Typography>
        <Typography align="center" paragraph>
          {error.message || 'No error message available'}
        </Typography>
        <Box display="flex" mt={1}>
          <Box mr={1}>
            <Tooltip
              PopperProps={{ disablePortal: true }}
              onClose={() => setOpen(false)}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title="Copied to clipboard"
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(error));
                  setOpen(true);
                  setTimeout(() => {
                    setOpen(false);
                  }, 1200);
                }}
                disabled={Object.keys(error).length === 0}
              >
                Copy to clipboard
              </Button>
            </Tooltip>
          </Box>
          <Box ml={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.location.reload(true)}
            >
              Reload
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InterruptErrorPage;
