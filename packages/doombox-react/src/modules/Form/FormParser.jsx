import React from 'react';
import { TYPE } from '@doombox/utils';
import {
  Formik,
  Form
} from 'formik';

// Core
import { Box } from '@material-ui/core';

import {
  Switch,
  FieldText,
  Button
} from '../../components';

// Hook
import { useIpc } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

const FormParser = () => {
  const system = useIpc(HOOK.IPC.SYSTEM);
  const { updateSystem } = useIpc(HOOK.IPC.METHOD);

  const configParser = system[TYPE.CONFIG.PARSER];
  const id = 'parser';

  return (
    <Formik
      initialValues={{
        ...configParser,
        fileFormats: configParser.fileFormats.join(', ')
      }}
      onSubmit={values => updateSystem(TYPE.CONFIG.PARSER, {
        ...values,
        fileFormats: values.fileFormats
          .split(',')
          .map(value => value.replace(/\s+/g, ''))
      })}
    >
      <Form>
        <Box display="flex" flexDirection="column">
          <Switch
            translate="skipCovers"
            checked={configParser.skipCovers}
            onChange={event => updateSystem(TYPE.CONFIG.PARSER, {
              ...configParser,
              [TYPE.OPTIONS.SKIP_COVERS]: event.target.checked
            })}
          />
          <Switch
            translate={TYPE.OPTIONS.PARSE_STRICT}
            checked={configParser[TYPE.OPTIONS.PARSE_STRICT]}
            onChange={event => updateSystem(TYPE.CONFIG.PARSER, {
              ...configParser,
              [TYPE.OPTIONS.PARSE_STRICT]: event.target.checked
            })}
          />
          <FieldText id={id} name={TYPE.OPTIONS.GLOB} />
          <FieldText id={id} name={TYPE.OPTIONS.PATH_IMAGE} />
          <FieldText id={id} name={TYPE.OPTIONS.FILE_FORMATS} />
        </Box>
        <Button type="submit">
          Update
        </Button>
      </Form>
    </Formik>
  );
};

export default FormParser;
