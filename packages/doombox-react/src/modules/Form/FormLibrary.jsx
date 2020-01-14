import React from 'react';
import { TYPE } from '@doombox/utils';
import {
  Formik,
  Form
} from 'formik';

// Core
import { Box } from '@material-ui/core';

import {
  FieldFolder,
  Button
} from '../../components';

// Actions
import { scanFolders } from '../../actions';

// Hook
import { useIpc } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

const FormLibrary = () => {
  const config = useIpc(HOOK.IPC.CONFIG);
  const { updateConfig } = useIpc(HOOK.IPC.METHOD);

  return (
    <Formik
      initialValues={config[TYPE.CONFIG.LIBRARY]}
      onSubmit={values => updateConfig(TYPE.CONFIG.LIBRARY, values)}
    >
      <Form>
        <Box display="flex" flexDirection="column">
          <FieldFolder name={TYPE.OPTIONS.FOLDERS} multi />
          <Box display="flex">
            <Button type="submit">
              Save folders
            </Button>
            <Button onClick={() => scanFolders(config[TYPE.CONFIG.LIBRARY][TYPE.OPTIONS.FOLDERS])}>
              Create library
            </Button>
          </Box>
        </Box>
      </Form>
    </Formik>
  );
};

export default FormLibrary;
