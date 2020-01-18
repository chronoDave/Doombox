import React from 'react';
import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Core
import {
  FieldFileAvatar,
  FieldText
} from '../../components';

// Modules
import FormBase from './FormBase';

// Validation
import { schemaPlaylist } from '../../validation/schema';

const FormPlaylist = props => {
  const {
    initialValues,
    onSubmit,
    children,
    ...rest
  } = props;
  const { t } = useTranslation();

  const id = 'playlist';

  return (
    <FormBase
      initialValues={initialValues}
      validationSchema={schemaPlaylist}
      onSubmit={onSubmit}
      {...rest}
    >
      <FieldFileAvatar id={id} name="src" />
      <FieldText
        id={id}
        name="name"
        label={t('field:name', { item: 'Playlist' })}
      />
      <ErrorMessage name="name" />
      {children}
    </FormBase>
  );
};

FormPlaylist.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    collection: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node
};

FormPlaylist.defaultProps = {
  initialValues: {
    name: '',
    src: '',
    collection: []
  },
  children: null
};

export default FormPlaylist;
