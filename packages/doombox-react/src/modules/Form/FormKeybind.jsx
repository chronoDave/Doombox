import React from 'react';
import {
  Formik,
  Form
} from 'formik';
import {
  TYPE,
  ACTION
} from '@doombox/utils';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import {
  Typography,
  FieldText
} from '../../components';

// Hook
import { useIpc } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

const FormKeybind = ({ children }) => {
  const config = useIpc(HOOK.IPC.CONFIG);
  const { updateConfig } = useIpc(HOOK.IPC.METHOD);

  return (
    <Formik
      initialValues={config[TYPE.CONFIG.KEYBIND]}
      onSubmit={values => updateConfig(TYPE.CONFIG.KEYBIND, values)}
    >
      <Form>
        <Box display="flex" flexDirection="column">
          <Typography>
            Audio
          </Typography>
          {Object.keys(ACTION.AUDIO).map(key => (
            <FieldText key={key} id={key} name={key} />
          ))}
        </Box>
        {children}
      </Form>
    </Formik>
  );
};

FormKeybind.propTypes = {
  children: PropTypes.element.isRequired
};

export default FormKeybind;
