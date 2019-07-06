import React from 'react';
import PropTypes from 'prop-types';

// Icon
import IconPerson from '@material-ui/icons/Person';

// Core
import { Avatar } from '../../Avatar';
import FieldSelectImage from './FieldSelectImage';

const FieldSelectAvatar = props => {
  const { inputProps, setValue, path } = props;

  return (
    <FieldSelectImage
      inputProps={inputProps}
      setValue={setValue}
    >
      <Avatar
        path={path}
        fallback={<IconPerson fontSize="large" />}
      />
    </FieldSelectImage>
  );
};

FieldSelectAvatar.propTypes = {
  inputProps: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string
  }).isRequired,
  setValue: PropTypes.func.isRequired,
  path: PropTypes.string
};

FieldSelectAvatar.defaultProps = {
  path: null
};

export default FieldSelectAvatar;
