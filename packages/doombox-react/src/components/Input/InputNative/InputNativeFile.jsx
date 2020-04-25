import React from 'react';
import PropTypes from 'prop-types';

// Core
import InputNative from './InputNative';

const InputNativeFile = props => {
  const {
    children,
    accept,
    type,
    onChange,
    ...rest
  } = props;

  const handleChange = event => {
    const files = Array
      .from(event.currentTarget.files)
      .map(file => ({
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate.toString(),
        name: file.name,
        path: file.path,
        size: file.size,
        type: file.type,
      }));

    onChange(files);
  };

  const getAccept = () => {
    switch (type) {
      case 'image':
        return ['.png', '.jpg', '.jpeg', '.gif'];
      default:
        return accept;
    }
  };

  return (
    <InputNative
      type="file"
      accept={getAccept().join(',')}
      onChange={handleChange}
      {...rest}
    >
      {children}
    </InputNative>
  );
};

InputNativeFile.propTypes = {
  children: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  accept: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.oneOf(['image'])
};

InputNativeFile.defaultProps = {
  accept: [],
  type: null
};

export default InputNativeFile;
