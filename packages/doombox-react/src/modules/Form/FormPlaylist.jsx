import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import {
  FormBase,
  FieldFileAvatar,
  FieldText
} from '../../components';

// Validation
import { schemaPlaylist } from '../../validation/schema';
import { propImage } from '../../validation/propTypes';

const FormPlaylist = ({ initialValues, onSubmit, ...rest }) => {
  const { t } = useTranslation();

  const formId = 'playlist';

  return (
    <FormBase
      validationSchema={schemaPlaylist}
      initialValues={initialValues}
      onSubmit={onSubmit}
      {...rest}
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

FormPlaylist.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
    cover: propImage,
    collection: PropTypes.arrayOf(PropTypes.string)
  }),
  onSubmit: PropTypes.func.isRequired
};

FormPlaylist.defaultProps = {
  initialValues: {
    name: '',
    cover: {},
    collection: []
  }
};

export default FormPlaylist;
