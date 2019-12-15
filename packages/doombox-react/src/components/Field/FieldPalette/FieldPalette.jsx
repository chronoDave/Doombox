import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  Typography
} from '@material-ui/core';

import FieldPaletteItem from './FieldPaletteItem.private';

const FieldPalette = ({ name, id: formId }) => {
  const id = `${formId}-${name}`;

  return (
    <Field name={name} id={id}>
      {({ field: { value } }) => (
        <Box display="flex" flexDirection="column">
          <Typography>
            {name}
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box>
              <FieldPaletteItem
                name={name}
                id={id}
                type="main"
                contrastColor={value.contrastText}
              />
            </Box>
            <Box display="flex" flexDirection="column">
              <FieldPaletteItem
                name={name}
                id={id}
                type="light"
                contrastColor={value.contrastText}
                reverse
                size="small"
              />
              <FieldPaletteItem
                name={name}
                id={id}
                type="dark"
                contrastColor={value.contrastText}
                reverse
                size="small"
              />
              <FieldPaletteItem
                name={name}
                id={id}
                type="contrastText"
                contrastColor={value.contrastText}
                reverse
                size="small"
              />
            </Box>
          </Box>
        </Box>
      )}
    </Field>
  );
};

FieldPalette.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default FieldPalette;
