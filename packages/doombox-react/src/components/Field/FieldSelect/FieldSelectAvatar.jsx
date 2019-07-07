import React from 'react';
import PropTypes from 'prop-types';

// Icon
import IconImageAdd from '@material-ui/icons/AddPhotoAlternate';
import IconPerson from '@material-ui/icons/Person';

// Core
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';

import { Avatar } from '../../Avatar';
import FieldSelectImage from './FieldSelectImage';

// Style
import FieldSelectStyle from './FieldSelectStyle';

const FieldSelectAvatar = props => {
  const {
    classes,
    field,
    setValue,
    path
  } = props;

  return (
    <FieldSelectImage
      field={field}
      setValue={setValue}
      render={renderProps => {
        const { onSelect } = renderProps;

        return (
          <div className={classes.root}>
            <IconButton
              classes={{ root: classes.fieldSelectIcon }}
              onClick={onSelect}
            >
              <IconImageAdd />
            </IconButton>
            <Avatar
              path={path}
              fallback={<IconPerson fontSize="large" />}
            />
          </div>
        );
      }}
    />
  );
};

FieldSelectAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  path: PropTypes.string
};

FieldSelectAvatar.defaultProps = {
  path: null
};

export default withStyles(
  FieldSelectStyle
)(FieldSelectAvatar);
