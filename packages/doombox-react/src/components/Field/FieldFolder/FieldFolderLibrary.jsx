import React from 'react';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Icons
import IconRemove from '@material-ui/icons/Close';
import IconRefresh from '@material-ui/icons/Refresh';

// Core
import {
  Box,
  IconButton
} from '@material-ui/core';

import { Tooltip } from '../../Tooltip';

import FieldFolderBase from './FieldFolderBase';

const FieldFolder = props => {
  const {
    onRefresh,
    onRemove,
    name,
    ...rest
  } = props;
  const { t } = useTranslation();

  return (
    <Field name={name}>
      {({
        field: { value },
        form: {
          setFieldValue,
          setFieldTouched
        }
      }) => (
        <FieldFolderBase
          multi
          value={value}
          onChange={folders => {
            setFieldTouched(name, true);
            setFieldValue(name, [
              ...value,
              ...folders.filter(folder => !value.includes(folder))
            ]);
          }}
          secondaryAction={(
            <Box display="flex">
              <Tooltip title={t('action:refresh', { context: 'folder' })}>
                <IconButton onClick={onRefresh}>
                  <IconRefresh />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('action:remove', { context: 'folder' })}>
                <IconButton onClick={onRemove}>
                  <IconRemove />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          {...rest}
        />
      )}
    </Field>
  );
};

FieldFolder.propTypes = {
  onRemove: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default FieldFolder;
