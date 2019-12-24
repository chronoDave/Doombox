import React from 'react';
import {
  Formik,
  Form
} from 'formik';

// Core
import { useTheme as useMuiTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import { FieldPalette } from '../../components';

// Hook
import { useIpc } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

const FormCreatePalette = () => {
  const { palette } = useMuiTheme();
  const { updatePalette } = useIpc(HOOK.IPC.METHOD);

  const formId = 'create-palette';

  return (
    <Formik
      initialValues={{
        primary: palette.primary,
        secondary: palette.secondary,
        error: palette.error,
        warning: palette.warning,
        success: palette.success,
        info: palette.info
      }}
      onSubmit={updatePalette}
    >
      <Form>
        <Button type="submit">
          Update
        </Button>
        {[
          'primary',
          'secondary',
          'error',
          'warning',
          'success',
          'info'
        ].map(key => (
          <FieldPalette
            key={key}
            id={formId}
            name={key}
          />
        ))}
      </Form>
    </Formik>
  );
};

export default FormCreatePalette;
