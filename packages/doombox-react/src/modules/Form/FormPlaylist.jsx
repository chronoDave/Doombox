import React from 'react';
import { useTranslation } from 'react-i18next';

// Core
import {
  FormBase,
  FieldFileAvatar,
  FieldText
} from '../../components';

// Validation
import { schemaPlaylist } from '../../validation/schema';

const FormPlaylist = props => {
  const { t } = useTranslation();

  const formId = 'playlist';

  return (
    <FormBase
      validationSchema={schemaPlaylist}
      {...props}
    >
      <FieldFileAvatar name="cover" id={formId} />
      <FieldText
        name="name"
        id={formId}
        label={t('field:name', { context: 'Playlist' })}
        disableDescription
      />
    </FormBase>
  );
};

export default FormPlaylist;
