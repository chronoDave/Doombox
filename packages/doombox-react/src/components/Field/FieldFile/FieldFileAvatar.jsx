import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

// Icon
import IconAddImage from '@material-ui/icons/AddPhotoAlternate';
import IconPerson from '@material-ui/icons/Person';
import IconCancel from '@material-ui/icons/Close';

// Core
import { IconButton } from '@material-ui/core';

import { Avatar } from '../../Avatar';
import FieldFileBase from './FieldFileBase';

// Style
import { useFieldFileStyle } from './FieldFile.style';

const FieldFileAvatar = ({ id }) => {
  const classes = useFieldFileStyle();

  return (
    <Field
      name="avatar"
      render={({
        field: { name, value },
        form: { setFieldValue }
      }) => (
        <FieldFileBase
          id={id}
          name={name}
          setFieldValue={setFieldValue}
          type="image"
          validator={['png', 'jpg', 'jpeg', 'gif']}
          render={({ onClick, onClear }) => (
            <div className={classes.root}>
              <IconButton
                classes={{ root: classes.fieldFileIcon }}
                onClick={value ? onClear : onClick}
              >
                {value ? <IconCancel /> : <IconAddImage />}
              </IconButton>
              <IconButton
                classes={{ root: classes.fieldFileAvatar }}
                onClick={onClick}
              >
                <Avatar
                  path={value ? value.path : null}
                  fallback={<IconPerson fontSize="large" />}
                />
              </IconButton>
            </div>
          )}
        />
      )}
    />
  );
};

FieldFileAvatar.propTypes = {
  id: PropTypes.string.isRequired
};

export default FieldFileAvatar;
