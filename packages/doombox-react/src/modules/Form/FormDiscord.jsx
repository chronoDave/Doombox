import React from 'react';
import {
  Formik,
  Form
} from 'formik';
import { TYPE } from '@doombox/utils';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { FieldText } from '../../components';

// Hook
import { useIpc } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

const FormDiscord = ({ children }) => {
  const config = useIpc(HOOK.IPC.CONFIG);
  const { updateConfig } = useIpc(HOOK.IPC.METHOD);

  const id = 'discord';

  return (
    <Formik
      initialValues={config[TYPE.CONFIG.DISCORD]}
      onSubmit={values => updateConfig(TYPE.CONFIG.DISCORD, values)}
    >
      <Form>
        <Box display="flex" flexDirection="column">
          <FieldText id={id} name={TYPE.OPTIONS.TOKEN} />
          <FieldText id={id} name={TYPE.OPTIONS.KEY_IMAGE} />
        </Box>
        {children}
      </Form>
    </Formik>
  );
};

FormDiscord.propTypes = {
  children: PropTypes.element.isRequired
};

export default FormDiscord;
