import React from 'react';
import { useTranslation } from 'react-i18next';

// Core
import {
  Form,
  FieldFileAvatar,
  FieldText
} from '../../components';

// Validation
import { schemaPlaylist } from '../../validation/schema';

const FormPlaylist = props => {
  const { t } = useTranslation();

  const initialValues = {
    name: '',
    src: '',
    collection: []
  };

  return (
    <Form
      id="playlist"
      validationSchema={schemaPlaylist}
      initialValues={initialValues}
      {...props}
    >
      <FieldFileAvatar name="src" />
      <FieldText
        name="name"
        label={t('field:name', { context: 'Playlist' })}
        disableDescription
      />
    </Form>
  );
};

export default FormPlaylist;
