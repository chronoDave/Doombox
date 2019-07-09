import React from 'react';
import PropTypes from 'prop-types';

// Icon
import IconImageAdd from '@material-ui/icons/AddPhotoAlternate';
import IconPerson from '@material-ui/icons/Person';

// Core
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';

import { Avatar } from '../../Avatar';
import FieldSelectBase from './FieldFileBase';

// Style
import FieldFileStyle from './FieldFileStyle';

const FieldFileAvatar = props => {
  const {
    classes,
    name,
    setValue,
    path
  } = props;

  return (
    <FieldSelectBase
      name={name}
      setValue={setValue}
      type="image"
      validator={['png', 'jpg', 'jpeg', 'gif']}
      render={renderProps => {
        const { onSelect } = renderProps;

        return (
          <div className={classes.root}>
            <IconButton
              classes={{ root: classes.fieldFileIcon }}
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

FieldFileAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  path: PropTypes.string
};

FieldFileAvatar.defaultProps = {
  path: null
};

export default withStyles(
  FieldFileStyle
)(FieldFileAvatar);
