import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Field } from 'formik';

// Core
import {
  Box,
  MenuItem,
  TextField,
} from '@material-ui/core';

// Language
import i18n from '../../locale';

const changeLanguage = lng => i18n.changeLanguage(lng);

const FieldLanguage = props => {
  const { id, ...rest } = props;
  const { t, i18n: { languages } } = useTranslation();

  return (
    <Field
      name="language"
      render={({
        field: { name, value },
        form: { setFieldValue, handleBlur }
      }) => (
        <Box width="100%" {...rest}>
          <TextField
            id={`${id}-${name}`}
            select
            label={t(name)}
            value={value}
            inputProps={{ onBlur: handleBlur }}
            onChange={event => {
              // Language validation is not needed
              setFieldValue(name, event.target.value, false);
              changeLanguage(event.target.value);
            }}
            fullWidth
            margin="normal"
            variant="outlined"
          >
            {languages.map(lang => (
              <MenuItem key={lang} value={lang}>
                {t(`${lang}_native`)}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      )}
    />
  );
};

FieldLanguage.propTypes = {
  id: PropTypes.string.isRequired
};

export default FieldLanguage;
