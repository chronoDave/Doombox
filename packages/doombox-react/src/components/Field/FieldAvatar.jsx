import React from 'react';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Icon
import IconPerson from '@material-ui/icons/Person';

// Core
import { Box } from '@material-ui/core';

import { InputNativeFile } from '../Input';
import {
  Button,
  ButtonAvatar
} from '../Button';

// Utils
import { pathToUrl } from '../../utils';

const FieldAvatar = ({ id, name }) => {
  const { t } = useTranslation();

  return (
    <Field name={name}>
      {({
        field: { value },
        form: {
          setFieldValue,
          setFieldTouched
        }
      }) => {
        const getSrc = () => {
          if (!value) return null;
          return pathToUrl(value.path || value.file);
        };

        const handleClear = () => {
          setFieldValue(name, null);
        };

        return (
          <InputNativeFile
            id={id}
            name={name}
            type="image"
            onChange={files => {
              setFieldTouched(name, true);
              setFieldValue(name, files[0]);
            }}
          >
            {({ onClick }) => (
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <ButtonAvatar
                  src={getSrc()}
                  alt={t('icon', { context: value ? 'playlist' : 'icon' })}
                  onClick={onClick}
                  size={10}
                  icon={<IconPerson />}
                />
                <Box pt={1} justifyContent="center" display="flex">
                  <Button onClick={value ? handleClear : onClick}>
                    {t(`action:${value ? 'remove' : 'add'}`)}
                  </Button>
                </Box>
              </Box>
            )}
          </InputNativeFile>
        );
      }}
    </Field>
  );
};

FieldAvatar.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default FieldAvatar;
